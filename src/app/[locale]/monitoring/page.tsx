/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ChartBar from "./components/Charts/ChartBar";
import ChartArea from "./components/Charts/ChartArea";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { MONITORING } from "@/apiConstants";
import { ChartData, DataCar, DataMonthly, DataWeekly } from "./types";
import { formattedDateWithWeek } from "./helper";
import { useTranslation } from "react-i18next";
import PageContainer from "@/components/PageContainer";

const Monitoring = () => {
  const {t} = useTranslation() as any;
  const [dataCars, setDataCars] = useState<ChartData[]>([]);
  const [dataMonthly, setDataMonthly] = useState<ChartData[]>([]);
  const [dataWeekly, setDataWeekly] = useState<ChartData[]>([]);

  const { get } = useApi();

  useEffect(() => {
    get(`${MONITORING}/cars`).then((res) => {
      if (Array.isArray(res)) {
        const chartDataCars = res.map((item: DataCar) => ({
          name: item.label.replace(" ", "\n"),
          "client count": item.y,
        }));
        setDataCars(chartDataCars);
      }
    });
  }, []);

  useEffect(() => {
    get(`${MONITORING}/weekly`).then((res) => {
      if (Array.isArray(res)) {
        const chartDataWeekly = res.map((item: DataWeekly) => ({
          name: formattedDateWithWeek(item.x, false),
          "client count": item.y,
        }));
        setDataWeekly(chartDataWeekly);
      }
    });
  }, []);

  useEffect(() => {
    get(`${MONITORING}/monthly`).then((res) => {
      if (Array.isArray(res)) {
        const chartDataMonthly = res.map((item: DataMonthly) => ({
          name: formattedDateWithWeek(item.label),
          "client count": item.y,
        }));
        setDataMonthly(chartDataMonthly);
      }
    });
  }, []);

  return (
    <PageContainer className="flex flex-col pt-10 pb-40">
      <ChartArea title="Cars Weekly Report" data={dataCars} tick={false} />
      <ChartBar
        title={t('monthly-report')}
        className="my-32"
        data={dataMonthly}
        color="#c54bb9"
      />
      <ChartBar title="Weekly Report" data={dataWeekly} />
    </PageContainer>
  );
};

export default Monitoring;
