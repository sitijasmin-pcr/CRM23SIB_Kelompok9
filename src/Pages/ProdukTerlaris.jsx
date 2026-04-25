import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

const dummyData = [
  { name: "Americano", sales: 120 },
  { name: "Latte", sales: 95 },
  { name: "Cappuccino", sales: 78 },
  { name: "Espresso", sales: 65 },
  { name: "Matcha Latte", sales: 50 },
];

export default function ProdukTerlaris() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulasikan fetch data dari backend
    setTimeout(() => {
      setData(dummyData);
    }, 500);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        {/* <Coffee className="w-6 h-6" />  */}
        Rangkuman Produk Terlaris - Tomoro Coffee
      </h1>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Statistik Penjualan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#FF9F00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button variant="default">Unduh Laporan</Button>
      </div>
    </div>
  );
}
