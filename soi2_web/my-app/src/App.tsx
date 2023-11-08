import React from 'react';
import {useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Скремблер',
    },
  },
};

// Значения по оси X
const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

function random_int(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для построения графика (сообщения)
function Func(x : number, A : number, B : number, C : number, a : number, b : number, y : number) : number 
{
  // A = 5, B = 2, C = 3, a = 45, b = 20, y = 30
  return (A * Math.sin(a * x) + B * Math.cos(b * x) + x * C * Math.cos(Math.cos(y * x)))
} 

export default function App() {
  // Константы для графика
  var A = random_int(1, 10)
  var B = random_int(1, 10)
  var C = random_int(1, 10)
  var a = random_int(10, 45)
  var b = random_int(10, 45)
  var y = random_int(10, 45)
  
  // Данные графика
  const [data, setData] = useState<any>({
      labels,
      datasets: [
        {
          label: 'Изменённое сообщение',
          data: labels.map((index) => Func(Number(index), A, B, C, a, b, y)),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Сообщение',
          data: labels.map((index) => Func(Number(index), A, B, C, a, b, y)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  );
  
  // Кодирование сообщения
  const Start = () => {
    var _data1 = data.datasets[0]["data"]
    var _data2 = data.datasets[1]["data"]
    
    // Делим граф на части (по парам)
    var array : Array<Array<number>> = _data1.reduce(function(result : any, value : number, index : number, array: any) {
        result.push(array.slice(index, index + 2))
      return result
    }, []);
    array.splice(array.length-1, 1)
    console.log("\n new array ", array, " old array ", _data1)
    
    // Перемешиваем
    for (var i = 0; i < array.length - 1; i++) 
    {
      var j = i + Math.floor(Math.random() * (array.length - i))
      var temp = array[j]
      array[j] = array[i]
      array[i] = temp
    }
    console.log("\n new array ", array)
    
    // Меняем данные на новые
    setData({
      labels,
      datasets: [
        {
          label: 'Изменённое сообщение',
          data: [
            {x: "1", y: array[0][0]},
            {x: "2", y: array[0][1]},
            {x: "2", y: array[1][0]},
            {x: "3", y: array[1][1]},
            {x: "3", y: array[2][0]},
            {x: "4", y: array[2][1]},
            {x: "4", y: array[3][0]},
            {x: "5", y: array[3][1]},
            {x: "5", y: array[4][0]},
            {x: "6", y: array[4][1]},
            {x: "6", y: array[5][0]},
            {x: "7", y: array[5][1]},
            {x: "7", y: array[6][0]},
            {x: "8", y: array[6][1]},
            {x: "8", y: array[7][0]},
            {x: "9", y: array[7][1]},
            {x: "9", y: array[8][0]},
            {x: "10", y: array[8][1]},
            {x: "10", y: array[9][0]},
            {x: "11", y: array[9][1]},
            {/* {x: "11", y: array[10][0]} */}
          ],
          borderColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Сообщение',
          data: _data2,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
      }
    );  
  }
  
  return (
      <div style={{textAlign: "center"}}>
        <Line options={options} data={data} />
        <button onClick={() => Start()} style={{width: "15%", height: "20%"}}>Start</button>
        <Popup trigger={<button>Что это?</button>} modal position="right center">
          <p>Визуализация наиболее простого и распространенным способа криптографического преобразования аналоговых сообщений </p>
          <p>Разбиение сообщений X(t) на части и выдача этих частей в определенном порядке в канал связи</p>
          <p><a>Выбирается функция X (t), описывающая значение входного сигнала в момент t1. Можно положить Х(t)=Asin(αt)+Bcos(βt)+tCcos(cos(γt)),гдеA,B,C,α,β,γ–константы</a>
          <a>Длительность сообщения X(t) (см. рис) делится на определенные, равные по длительности временные интервалы T = 1-2. Каждый такой временной интервал дополнительно делится на более мелкие временные интервалы длительностью t . Части сообщения X(t) на интервалах времени t записываются в запоминающее устройство, “перемешиваются” между собой в соответствие с правилом, определяемым ключом криптографического преобразования k, и в виде сигнала Y(t) выдаются в канал связи. </a></p>
        </Popup>
      </div>
  );
}
