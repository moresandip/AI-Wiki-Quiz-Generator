import requests
from bs4 import BeautifulSoup
import time

def scrape_wikipedia(url: str) -> tuple[str, str]:
    """
    Fetch Wikipedia article content using both API and web scraping for comprehensive data.
    Includes retry logic and better error handling for network issues.
    """
    try:
        # Validate URL
        if 'wikipedia.org/wiki/' not in url:
            raise ValueError("Invalid Wikipedia URL. Must be a Wikipedia article URL.")

        # Extract title from URL
        title = url.split('/wiki/')[1].split('#')[0].split('?')[0]
        article_title = title.replace('_', ' ')
        summary_content = ""

        # Retry configuration
        max_retries = 3
        retry_delay = 2  # seconds
        headers = {'User-Agent': 'AI Wiki Quiz Generator/1.0 (https://github.com/moresandip/AI-Wiki-Quiz-Generator)'}

        # Try to get summary from API with retries
        api_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
        for attempt in range(max_retries):
            try:
                response = requests.get(api_url, headers=headers, timeout=20)
                if response.status_code == 200:
                    data = response.json()
                    article_title = data.get('title', article_title)
                    summary_content = data.get('extract', '')
                    break
            except (requests.exceptions.Timeout, requests.exceptions.ConnectionError) as e:
                if attempt < max_retries - 1:
                    time.sleep(retry_delay * (attempt + 1))  # Exponential backoff
                    continue
                # If API fails after retries, continue with web scraping only

        # Get full article content using web scraping with retries
        full_url = f"https://en.wikipedia.org/wiki/{title}"
        full_content = ""
        
        for attempt in range(max_retries):
            try:
                response = requests.get(full_url, headers=headers, timeout=20)
                response.raise_for_status()
                break
            except (requests.exceptions.Timeout, requests.exceptions.ConnectionError) as e:
                if attempt < max_retries - 1:
                    time.sleep(retry_delay * (attempt + 1))  # Exponential backoff
                    continue
                else:
                    raise ValueError(f"Failed to fetch Wikipedia article after {max_retries} attempts. Please check your internet connection and try again.")

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
            raise ValueError("No content found in the article. The article might be empty or the URL is incorrect.")

        # Clean up the content
        content = content.replace('\n', ' ').replace('\t', ' ')
        # Remove multiple spaces
        while '  ' in content:
            content = content.replace('  ', ' ')

        # Limit content length to avoid token limits
        content = content[:8000]  # Increased limit for better quiz generation

        return content.strip(), article_title

    except requests.exceptions.Timeout as e:
        raise ValueError(f"Connection to Wikipedia timed out. Please check your internet connection and try again.")
    except requests.exceptions.ConnectionError as e:
        raise ValueError(f"Failed to connect to Wikipedia. Please check your internet connection and try again.")
    except requests.exceptions.RequestException as e:
        raise ValueError(f"Failed to fetch from Wikipedia: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error processing article: {str(e)}")
