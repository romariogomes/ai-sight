import { Card } from "components";
import { ISummaryData } from "pages/Home/types";
import { useSummaryData } from "../../hooks";

interface ISummaryProps {
  data?: ISummaryData;
}

export const Summary = ({ data }: ISummaryProps) => {
  const {} = useSummaryData();

  if (!data) return null;
  console.log("aqui no summary", data);
  return (
    <Card>
      <div>summary</div>
    </Card>
  );
};
