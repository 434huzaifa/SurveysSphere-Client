import { Accordion } from 'flowbite-react';
const FAQ = () => {
    return (
        <div className='my-4'>
            <Accordion>
                <Accordion.Panel>
                    <Accordion.Title>What is SurveySphere?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                        SurveySphere is User Friendly Survey Create, Participate and Manage web application.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>What is consider inappropriate??</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Any survey that contain hatefull, aggresive, attacking etc.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Why Choose us?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                           Other Company might just provide their services but we provide services with after sell services. we care about you.
                        </p>
                       
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
};

export default FAQ;