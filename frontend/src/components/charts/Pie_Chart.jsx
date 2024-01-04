// please install npm install react-apexcharts apexcharts
import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";
function Piechart()
{
   const [Channels, setChannels]= useState([]);
   const [Demands, setDemands]= useState([98,25,28,33]);

   useEffect( ()=>{
       const sChannels=[];
       const sDemands=[];
       const getChannelData= async()=>{
       const reqData= await fetch("http://localhost/reactgraphtutorial/marks");
       const resData= await reqData.json();       
       for(let i=0; i< resData.length; i++)
       {
        setChannels.push(resData[i].Channel);
        sDemands.push(parseInt(resData[i].Demand));
       }
       set(sChannels);
       setDemands(sDemands);
       
       }

    getChannelData();

   },[]);

    return(
        <React.Fragment>
            <div className="container-fluid mb-8">
                
                <Chart 
                type="pie"
                width={380}
                height={400}

                series={ Demands }                

                options={{
                        title:{ text:""
                        } , 
                       noData:{text:"Empty Data"},                        
                      labels:Channels                    

                 }}
                >
                </Chart>
            </div>
        </React.Fragment>
    );
}
export default Piechart;