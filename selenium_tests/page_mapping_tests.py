from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

TEST_QUESTIONS = {
    "stock price of aapl": "question/Stock",
    "general info on aapl": "question/Information",
    "ceo of aapl": "question/Information",
    "headquarters of aapl":"question/Information",
    "aapl":"question/Information",
    "should i sell my aapl stock?":"question/Stock",
    "should i sell my apple stock?":"question/Stock",
}

def main(path, query):
    print "Testng '{0}' should reach path: {1}".format(query, path)
    driver = webdriver.Firefox()
    driver.get("http://localhost:8080")
    search = driver.find_element_by_tag_name("input")
    search.send_keys(query)
    button = driver.find_element_by_tag_name("button")
    button.click()
    time.sleep(5)
    assert driver.current_url == "http://localhost:8080/" + path
    driver.quit()

if __name__ == "__main__":
    print "Be sure your local host is running prior to these tests!"
    for question, path in TEST_QUESTIONS.items():
        main(path, question)
