# test_llm.py
print("Starting LLM test...")
try:
    from llm_quiz_generator import create_quiz_generator
    print("Imported create_quiz_generator successfully.")
    
    # Attempt to create the generator
    generator = create_quiz_generator()
    print("Quiz generator created successfully.")
    
    # If it's a mock generator, we can't test invoke the same way
    if 'Mock' in str(type(generator)):
        print("Running in mock mode. LLM is not configured.")
    else:
        print("LLM generator initialized. Test successful.")

except Exception as e:
    import traceback
    print(f"An error occurred: {e}")
    traceback.print_exc()

print("LLM test finished.")
