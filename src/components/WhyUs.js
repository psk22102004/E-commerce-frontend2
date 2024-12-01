import React from "react";

const WhyUs = ({ data }) => {
    return (
        <>
        <div className="flex flex-wrap gap-6 justify-evenly ">

            {
                data.map(
                    (ele, index) => {
                        return (
                            <div key={index} className="flex space-x-4 p-4 max-w-xl border bg-white rounded-xl">
                                <img src={ele.icon} className="w-14 h-12 rounded-full object-contain" />
                                <div className="flex flex-col space-y-2 ">
                                    <h1 className="font-bold text-lg">{ele.title} </h1>
                                    <h1 className=" text-sm">{ele.description} </h1>
                                </div>

                            </div>
                        )
                    }
                )
            }
        </div>
        </>
    );
};

export default WhyUs;
