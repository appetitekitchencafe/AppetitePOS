export default function DashboardCards({ stats }) {

  const data = stats || {
    todaySales: 0,
    todayOrders: 0,
    averageBill: 0,
    totalMenu: 0,
    availableItems: 0,
    topItems: [],
  };

  const cards = [
    {
      title: "Today's Revenue",
      value: `₹${Number(data.todaySales).toFixed(2)}`,
      color: "blue",
      icon: "💰",
    },
    {
      title: "Today's Orders",
      value: data.todayOrders,
      color: "green",
      icon: "🧾",
    },
    {
      title: "Average Bill",
      value: `₹${data.averageBill}`,
      color: "orange",
      icon: "📈",
    },
    {
      title: "Menu Items",
      value: data.totalMenu,
      color: "purple",
      icon: "🍽",
    },
    {
      title: "Available Items",
      value: data.availableItems,
      color: "teal",
      icon: "✅",
    },
    {
      title: "Best Seller",
      value:
        data.topItems.length > 0
          ? data.topItems[0].name
          : "--",
      color: "red",
      icon: "🏆",
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card) => (
        <div className={`card ${card.color}`} key={card.title}>
          <h2>{card.icon}</h2>
          <h3>{card.value}</h3>
          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
}