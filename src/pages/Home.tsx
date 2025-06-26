const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4"></h1>

    </div>
  );
};

export default Home;
// src/pages/Home.tsx
// import { useEffect, useState } from "react";
// import { fetchProperties } from "../api";
// import { Property } from "../types/Property";
// import PropertyList from "../components/PropertyList";

// const dummyProperties: Property[] = [
//   {
//     id: 1,
//     address: "123 Main St",
//     purchasePrice: 500000,
//     grossIncome: 85000,
//     totalUnits: 4,
//     grossExpenses: 20000,
//     units: [
//       { id: 1, unitType: "1BR", size: 600, rent: 1200 },
//       { id: 2, unitType: "2BR", size: 800, rent: 1500 },
//       { id: 3, unitType: "Studio", size: 400, rent: 1000 },
//       { id: 4, unitType: "1BR", size: 650, rent: 1250 },
//     ],
//   },
// ];


// const Home = () => {
//   const [properties, setProperties] = useState<Property[]>(dummyProperties);

//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchProperties();
//       setProperties(data);
//     };

//     loadData();
//   }, []);

//   return (
//     <div>
//       <h1>Properties</h1>
//       <PropertyList properties={properties} />
//     </div>
//   );
// };

// export default Home;



