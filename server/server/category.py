import os
import ast
from flask import jsonify
import time
from openai import OpenAI
import openai
from dotenv import load_dotenv
load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")




def get_response(user_input):
    prompt= """For any question or query that you are provided with , just classify it into either category from:\
    1.Common_Law
    It is sometimes referred to as judicial precedent, judge-made, or case law. It is a law from judicial decisions rendered by courts and comparable authorities.\
    It is, as the name suggests, universal. One-third of the world's population now lives in common law jurisdictions or systems. The legislation governing civil and criminal justice,\
    such as the Indian Penal Code of 1860, the Indian Evidence Act of 1872,\
    the Code of Criminal Procedure 1973, and the Code of Civil Procedure 1908 that we have today were essentially drawn from Common Law.\
    It is described as a set of legal norms established by judges after the conclusion of cases, as opposed to rules and laws established by the legislature or in official statutes.\
    A regulation that a court made the people obligated to read contracts is an example of common law.\

    2.Criminal_Law
    The name implies that the police department is entirely responsible for enforcing this rule. This law is designed to minimise crime in society. Certain crimes,\
    including robbery, murder, kidnapping, rape, and so on, shall be prosecuted and punished in accordance with criminal law. The Indian Penal Code, the Indian Evidence Act,\
    and the Code of Criminal Procedure declare it. Criminal law is primarily concerned with public service rather than private investigations. 
    For instance, if a thief takes a car, the remaining vehicle owners will get concerned and file a complaint. As a result, this complaint will be seen as representing the majority of the public's viewpoint.\

    3. Civil_Law
    Civil law is best described as looking at conduct that is not a crime. The Civil Procedure Code (CPC) governs how civil courts operate. It is a branch of law that deals\
    with disagreements between individuals and organisations. Individuals must solve their own problems by going to court on their own or with the assistance of a lawyer.\
    It could be issues related to property, religion, family feuds, or any such disagreement. 
    For example, a vehicle accident victim may sue the driver for loss or harm received in the accident, or one firm may sue another for a business disagreement.

    Civil law is further broadly divided into the following - 

    -Family Law
    There are many aspects of family law, including marriage and divorce, child care, and economic considerations related to family relationships.

    -Contract Law
    Contract law is the body of legislation that governs the formation, enforcement, and final execution of all legal contracts or agreements.\
    Contract law affects everyone who conducts commercial operations at some time. All types of corporations and firms mostly utilise different types of contracts \
    in business and consumer law to smoothly align their operation and collaborate with individual entities. 

    -Administrative Law
    Administrative law is an essential aspect of Indian administration. It assures that, in accordance with the Indian Constitution, government personnel do\
     not infringe on the rights of their citizenry. The administration of particular laws is governed by Indian government administrative law.

    -Statutory Law
    Legislative law is the more common term for statutory law. Statutory law is the kind of law framed by multiple legislative entities formally in writing.\
     Following the amendments and changes in societal mindset, these laws are subject to amendment after in-depth assessment under supreme and subordinate legislation.\
      The legislative assemblies have the authority to create, amend, seek approval and pass these laws following their alignment with the modern legal framework. 

    State-established legal drinking age or imposed penalties for exceeding the given speed limits by riders in traffic framed as a traffic law are a few examples of statutory law.\
    The output should be in json format where the keys are the question,its category and its sub-category if it exists\
    and they have the corresponding values.
    ```
    Question: {question}
    ```"""

    # Create an instance of the OpenAI client
    client = OpenAI()

    # Generate completion using user input
    completion = client.chat.completions.create(
        model='gpt-3.5-turbo-1106',
        messages=[
            {'role': 'user', 'content': prompt.format(question=user_input)},
        ],
        response_format={'type': 'json_object'},
        seed=42
    )

    # Extract and return the JSON answer
    ans_dict = ast.literal_eval(completion.choices[0].message.content)
    return ans_dict

    