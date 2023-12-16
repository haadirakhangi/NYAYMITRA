import React from 'react';
import CardGrid from './Card';
import lawyer from './features/lawyer.png';
import donation from './features/donation.png';
import forum from './features/forum.png';
import documentImg from './features/document.png';
import rights from './features/rights.png';

// Assuming CardData type definition
type CardData = {
  imageUrl: string;
  title: string;
  description: string;
};

type Props = {};

const Features = (props: Props) => {
  const cardsData: CardData[] = [
    {
      imageUrl: documentImg,
      title: 'Document Drafting',
      description:
        'Effortlessly generate precise and efficient legal documents, including contracts, agreements, and legal notices, with our advanced document drafting AI.',
    },
    {
      imageUrl: rights,
      title: 'Know Your Rights',
      description:
        'Navigate the complexities of the legal landscape with our Know-Your-Rights framework. We simplify intricate laws into user-friendly insights, providing you with a legal compass for informed decision-making.',
    },
    {
      imageUrl: lawyer,
      title: 'Advo Connect',
      description:
        'Connect with legal experts in real-time through Advo Connect. Engage in conversations to seek advice and clarification on a wide range of legal matters with our interactive platform.',
    },
    {
      imageUrl: forum,
      title: 'Legal Consultancy Forums',
      description:
        'Participate in Legal Consultancy Forums to analyze legal cases, extract relevant information, and generate insightful reports. Collaborate with legal professionals to enhance your understanding of complex legal issues.',
    },
    {
      imageUrl: donation,
      title: 'Platform for Legal Aid Fund-Raising',
      description:
        'Contribute to the cause of justice by using our platform for Legal Aid Fund-Raising. Automatically review contracts, identify potential issues, and ensure compliance while supporting legal aid initiatives.',
    },
    {
      imageUrl: documentImg,
      title: 'Legal Compliance Checker',
      description:
        'Safeguard against legal risks with our Legal Compliance Checker. Leverage our AI-powered tool to ensure legal compliance by checking documents against the latest laws and regulations, providing you with peace of mind.',
    },
  ];

  return (
    <div>
        <div style={{ padding: '20px', overflow: 'hidden' }}>
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Features</h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="https://img.freepik.com/free-vector/mobile-testing-concept-illustration_114360-1564.jpg?w=996&t=st=1702734521~exp=1702735121~hmac=6bc46c2cb18f5bc2f8b953f096045a6744dc4f6276c7fac6a80cbef659a65177" alt="mockup" />
            </div>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto lg:m-5 lg:ml-12">
        {cardsData.map((card, index) => (
          <CardGrid
            key={index}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
