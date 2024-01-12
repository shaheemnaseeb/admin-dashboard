import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../../src/theme";
import { mockDataTickets } from "../../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Generate data for priority of tickets (low, medium, high)
  const data = [
    {
      priority: "low",
      "Open tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "low" && ticket.status === "open"
      ).length,
      "Open ticketsColor": "hsl(0, 100%, 50%)",
      "Closed tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "low" && ticket.status === "closed"
      ).length,
      "Closed ticketsColor": "hsl(0, 100%, 50%)",
      "Pending tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "low" && ticket.status === "pending"
      ).length,
      "Pending ticketsColor": "hsl(0, 100%, 50%)",
    },
    {
      priority: "medium",
      "Open tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "medium" && ticket.status === "open"
      ).length,
      "Open ticketsColor": "hsl(0, 100%, 50%)",
      "Closed tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "medium" && ticket.status === "closed"
      ).length,
      "Closed ticketsColor": "hsl(0, 100%, 50%)",
      "Pending tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "medium" && ticket.status === "pending"
      ).length,
      "Pending ticketsColor": "hsl(0, 100%, 50%)",
    },
    {
      priority: "high",
      "Open tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "high" && ticket.status === "open"
      ).length,
      "Open ticketsColor": "hsl(0, 100%, 50%)",
      "Closed tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "high" && ticket.status === "closed"
      ).length,
      "Closed ticketsColor": "hsl(0, 100%, 50%)",
      "Pending tickets": mockDataTickets.filter(
        (ticket) => ticket.priority === "high" && ticket.status === "pending"
      ).length,
      "Pending ticketsColor": "hsl(0, 100%, 50%)",
    },
  ];

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["Open tickets", "Closed tickets", "Pending tickets"]}
      indexBy="priority"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "priority", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "status", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in priority: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
