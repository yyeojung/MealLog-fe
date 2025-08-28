interface Props {
  tab: string;
  calories: number;
}

const KcalBox = ({ tab, calories }: Props) => {
  console.log(calories);
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/90 p-6 text-center shadow-lg backdrop-blur-sm">
      <div className="mb-3 text-sm font-bold text-gray-600">2024.05.05</div>
      <div className="mb-3 text-sm font-medium text-gray-600">총 {tab} 칼로리</div>
      <div className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
        {calories}
        <span className="ml-2 text-xl text-gray-500">kcal</span>
      </div>
      {/* <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
        <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>목표 대비 77%
      </div> */}
    </div>
  );
};

export default KcalBox;
