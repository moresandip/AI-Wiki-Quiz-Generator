import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url: str) -> tuple[str, str]:
    """
    Fetch Wikipedia article content using both API and web scraping for comprehensive data.
    """
    try:
        # Validate URL
        if 'wikipedia.org/wiki/' not in url:
            raise ValueError("Invalid Wikipedia URL. Must be a Wikipedia article URL.")

        # Extract title from URL
        title = url.split('/wiki/')[1].split('#')[0].split('?')[0]

        # First, try to get summary from API
        api_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
        headers = {'User-Agent': 'AI Wiki Quiz Generator/1.0'}
        response = requests.get(api_url, headers=headers, timeout=15)

        if response.status_code == 200:
            data = response.json()
            article_title = data.get('title', title.replace('_', ' '))
            summary_content = data.get('extract', '')
        else:
            # Fallback to web scraping if API fails
            article_title = title.replace('_', ' ')
            summary_content = ""

        # Get full article content using web scraping for more detailed information
        full_url = f"https://en.wikipedia.org/wiki/{title}"
        response = requests.get(full_url, headers=headers, timeout=15)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')

        # Remove unwanted elements
        for element in soup.find_all(['script', 'style', 'table', 'sup', 'span', {'class': 'reference'}, {'class': 'mw-editsection'}]):
            element.decompose()

        # Get the main content
        content_div = soup.find('div', {'id': 'mw-content-text'})
        if content_div:
            # Get all paragraphs from the main content
            paragraphs = content_div.find_all('p', limit=20)  # Limit to first 20 paragraphs
            full_content = ' '.join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])

            # If we have API summary, combine it with full content
            if summary_content:
                content = summary_content + " " + full_content
            else:
                content = full_content
        else:
            content = summary_content

        if not content.strip():
            raise ValueError("No content found in the article.")

        # Clean up the content
        content = content.replace('\n', ' ').replace('\t', ' ')
        # Remove multiple spaces
        while '  ' in content:
            content = content.replace('  ', ' ')

        # Limit content length to avoid token limits
        content = content[:8000]  # Increased limit for better quiz generation

        return content.strip(), article_title

    except requests.exceptions.RequestException as e:
        raise ValueError(f"Failed to fetch from Wikipedia: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error processing article: {str(e)}")
