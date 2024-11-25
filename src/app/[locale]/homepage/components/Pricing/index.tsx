import Typography from "@/components/Typography";
import Icon from "@/components/Icon";
import React from "react";
import PageContainer from "@/components/PageContainer";
import { DATA } from "./constants";

const { Text } = Typography;

const Pricing = () => {
  return (
    <div className="bg-white w-full">
      <PageContainer className="ml-24">
        <Text className="mb-8 mt-16 text-black text-4xl" color="black" bold>
          Choose the right plan for your team
        </Text>
        <div className="flex w-full justify-between">
          {DATA.map((elem) => (
            <div
              key={elem.title}
              className="flex flex-col  border border-black shadow-md rounded-2xl w-[378px] h-[610px] py-6 px-4"
            >
              <Text color="black" bold className="text-black mt-6">
                {elem.title}
              </Text>
              <Text color="black" bold className="text-black mt-4">
                {elem.price}
              </Text>
              <Text color="black" bold className="text-black mt-6">
                {elem.days}
              </Text>
              <div className="mt-2">
                {elem.benefits.map((benefit, idx) => (
                  <div key={idx} className="mt-8">
                    {benefit?.title && (
                      <Text bold className="text-lg text-black" color="black">
                        {benefit.title}
                      </Text>
                    )}
                    {benefit?.data.map((el, idx) => (
                      <div key={idx} className="flex mt-3">
                        <Icon
                          name="green-check"
                          className="self-center mr-2"
                          size={20}
                        />
                        <Text color="black" className="text-black" bold>
                          {el}
                        </Text>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default Pricing;
