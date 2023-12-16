import React from 'react'
import freedom from './human-rights/freedom.jpg'
import disable from './human-rights/disable.jpg'

type Props = {}

export default function rights({ }: Props) {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
                    <div role="main" className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-semibold leading-9 text-center text-gray-800 dark:text-gray-50">Human Rights Awareness</h1>
                        <p className="text-base leading-normal text-center text-gray-600 dark:text-white mt-4 lg:w-1/2 md:w-10/12 w-11/12">Human rights are inherent to all individuals and encompass a wide range of fundamental rights and freedoms, such as the right to life, liberty, and security, freedom of expression, and protection from discrimination.</p>
                    </div>
                    <div className="lg:flex items-stretch md:mt-12 mt-8">
                        <div className="lg:w-1/2">
                            <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
                                <div className="sm:w-1/2 relative">
                                    <div>
                                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">Article 19 to 22</p>
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h2 className="text-xl font-semibold 5 text-white">Rights to Freedom</h2>
                                            <p className="text-base leading-4 text-white mt-2">To protect individuals</p>
                                            <a href="javascript:void(0)" className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                                                <p className="pr-2 text-sm font-medium leading-none">Read More</p>
                                                <svg className="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <img src={freedom} className="w-full" alt="chair" />
                                </div>
                                <div className="sm:w-1/2 sm:mt-0 mt-4 relative">
                                    <div>
                                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">Article 21</p>
                                        <div className="absolute bottom-0 left-0 p-6 ml-28">
                                            <h2 className="text-xl font-semibold 5 text-white">Disability Rights</h2>
                                            <p className="text-base leading-4 text-white mt-2">No Discrimination</p>
                                            <a href="javascript:void(0)" className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                                                <p className="pr-2 text-sm font-medium leading-none">Read More</p>
                                                <svg className="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <img src="https://i.pinimg.com/564x/96/0e/e8/960ee8f6e97434e0d23aefe0f8357ec6.jpg" className="h-[330px]" alt="wall design" />
                                </div>
                            </div>
                            <div className="relative">
                                <div>
                                    <p className="md:p-10 p-6 text-md font-medium leading-3 text-white absolute top-0 right-0">Article 25-28</p>
                                    <div className="absolute bottom-0 left-0 md:p-10 p-6">
                                        <h2 className="text-xl font-semibold 5 text-black">Freedom of Religion</h2>
                                        <p className="text-base leading-4 text-black mt-2">Equality to all</p>
                                        <a href="javascript:void(0)" className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                                            <p className="pr-2 text-sm font-medium leading-none">Read More</p>
                                            <svg className="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <img src="https://i.pinimg.com/564x/88/6e/99/886e9929d21f3cf4253301ea7ad91169.jpg" alt="sitting place" className="w-full mt-8 md:mt-6 hidden sm:block" />
                                <img className="w-full mt-4 sm:hidden" src="https://i.ibb.co/6XYbN7f/Rectangle-29.png" alt="sitting place" />
                            </div>
                        </div>
                        <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
                            <div className="relative">
                                <div>
                                    <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">Section 498A</p>
                                    <div className="absolute bottom-0 left-0 md:p-10 p-6">
                                        <h2 className="text-xl font-semibold 5 text-white">Domestic Volience</h2>
                                        <p className="text-base leading-4 text-white mt-2">Increasing awareness for Section</p>
                                        <a href="javascript:void(0)" className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                                            <p className="pr-2 text-sm font-medium leading-none">Read More</p>
                                            <svg className="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <img src="https://i.pinimg.com/564x/2c/8f/b1/2c8fb1aad026f0558a6e4f42b4e2aa02.jpg" alt="sitting place" className="w-full sm:block hidden" />
                                <img className="w-full sm:hidden" src="https://i.ibb.co/dpXStJk/Rectangle-29.png" alt="sitting place" />
                            </div>
                            <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
                                <div className="relative w-full">
                                    <div>
                                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">Article 29-30</p>
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h2 className="text-xl font-semibold 5 text-white">Education Rights</h2>
                                            <p className="text-base leading-4 text-white mt-2">Education for everyone</p>
                                            <a href="javascript:void(0)" className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                                                <p className="pr-2 text-sm font-medium leading-none">Read More</p>
                                                <svg className="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <img src="https://i.pinimg.com/564x/cb/21/28/cb212876480f56336437bcfda3c2c654.jpg" className="w-full" alt="chair" />
                                </div>
                                <div className="relative w-full sm:mt-0 mt-4">
                                    <div>
                                        <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">Article 41 - 43</p>
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h2 className="text-xl font-semibold 5 text-white">Labour Rights</h2>
                                            <p className="text-base leading-4 text-white mt-2">Fair and humane treatment</p>
                                            <a href="javascript:void(0)" className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline">
                                                <p className="pr-2 text-sm font-medium leading-none">Read More</p>
                                                <svg className="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <img src="https://i.pinimg.com/564x/1a/de/62/1ade62d721ecfc3a82ee7eef3c967e27.jpg" className="w-full" alt="wall design" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}