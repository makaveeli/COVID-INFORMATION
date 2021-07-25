import React from 'react';
import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import './../assets/css/customstyles.css'
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const GridX = withStyles({
  root: {
    flexGrow:1,
  }
})(Grid);

const PaperLeft = withStyles({
  root: {
    // flexGrow:1,
    width: 320
  }
})(Paper);

const ButtonLeft = withStyles({
  root: {
    width: 300,
    height: 100,
    padding: 2,
    margin: 10
  }
})(Button);

type myProps = {
  totalDeath: any,
  totalPositif: any,
  totalRecover: any,
  chart:any,
  positif: any,
  death: any,
  recover: any,
  provinsi: any,
}
class AppMakaveli extends React.Component<{}, myProps> {
  constructor(props: {} | Readonly<{}>){
    super(props);

    this.state = {
      totalDeath: 0,
      totalPositif: 0,
      totalRecover: 0,
      chart:'',
      positif:'',
      recover:[],
      death:[],
      provinsi:[]
    }
  }

  async componentDidMount(){
    const result = await axios(
      'http://localhost:5000/covidDatas',
    );

    this.setState({
      totalDeath: result.data.totalDeath,
      totalPositif: result.data.totalPositif,
      totalRecover: result.data.totalRecover
    })

    this.loadPie();
  }

  loadPie = () =>{
    let data = [this.state.totalDeath, this.state.totalPositif, this.state.totalRecover]
    let labels = ['total death', 'total positif', 'total recover']
    
    let customLabels = labels.map((label,index) =>`${label}: ${data[index]}`)

    const chartdata = {
      labels: customLabels,
      datasets: [
        {
          label: "Simpanse Covid",
          backgroundColor: [
            "#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900",
          ],
          data: data,
        },
      ],
    };

    var x =  <Doughnut data={chartdata}
                options={{
                  legend: { display: true, position: "right" },
                  datalabels: {
                    display: false,
                    color: "white",
                  },
                  tooltips: {
                    backgroundColor: "#5a6e7f",
                  },
                }}/>

    this.setState({
      chart: x
    })
  }

  deathCase = async() =>{
    const result = await axios(
      'http://localhost:5000/covidDatas',
    );
    const dataDeath = {
      labels: result.data.provinsi,
      datasets: [
        {
          label: 'Death Case',
          backgroundColor: [
            "#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900",
            "#fe4365","#fc9d9a","#f9cdad","#c8c8a9","#83af9b",
            "#ecd078","#d95b43","#c02942","#542437","#53777a",
            "#556270","#4ecdc4","#c7f464","#ff6b6b","#c44d58",
            "#774f38","#e08e79","#f1d4af","#ece5ce","#c5e0dc",
            "#e8ddcb","#cdb380","#036564","#033649","#031634",
            "#490a3d","#bd1550","#e97f02","#f8ca00","#8a9b0f",
            "#594f4f","#547980","#45ada8","#9de0ad","#e5fcc2",
          ],
          borderColor: 'white',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'black',
          data: result.data.deathCases
        }
      ]
    };

    const optionss = {
      tooltips: {
        enabled: true,
      },
      legend: {
        display: false
      },
      scales: 
      {
        yAxes: [
          {
              barPercentage: 0.7,
              // scaleLabel: {
              //   display: true,
              //   labelString: 'Provinsi'
              // },
              ticks: {
                fontSize: 9,
                autoSkip: false,
                maxRotation: 90,
                minRotation: 20
              }
          },
        ],
        xAxes: [
          {
          scaleLabel: {
            display: true,
            labelString: 'Death Case'
          }
          }
        ],
      }
    }

    var x = <HorizontalBar data={dataDeath} options={optionss}/>

    this.setState({
      chart: x
    })

  }
  positifCase = async() =>{
    const result = await axios(
      'http://localhost:5000/covidDatas',
    );

    const dataPositif = {
      labels: result.data.provinsi,
      datasets: [
        {
          label: 'Positif Case',
          backgroundColor: [
            "#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900",
            "#fe4365","#fc9d9a","#f9cdad","#c8c8a9","#83af9b",
            "#ecd078","#d95b43","#c02942","#542437","#53777a",
            "#556270","#4ecdc4","#c7f464","#ff6b6b","#c44d58",
            "#774f38","#e08e79","#f1d4af","#ece5ce","#c5e0dc",
            "#e8ddcb","#cdb380","#036564","#033649","#031634",
            "#490a3d","#bd1550","#e97f02","#f8ca00","#8a9b0f",
            "#594f4f","#547980","#45ada8","#9de0ad","#e5fcc2",
          ],
          borderColor: 'white',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'black',
          data: result.data.positifCases
        }
      ]
    };

    const optionss = {
      tooltips: {
        enabled: true,
      },
      legend: {
        display: false
      },
      scales: 
      {
        yAxes: [
          {
              barPercentage: 0.7,
              // scaleLabel: {
              //   display: true,
              //   labelString: 'Provinsi'
              // },
              ticks: {
                fontSize: 9,
                autoSkip: false,
                maxRotation: 90,
                minRotation: 20
              }
          },
        ],
        xAxes: [
          {
          scaleLabel: {
            display: true,
            labelString: 'Positif Case'
          }
          }
        ],
      }
    }
    var x = <HorizontalBar data={dataPositif} options={optionss}/>

    this.setState({
      chart: x
    })


  }
  recoverCase = async() =>{
    const result = await axios(
      'http://localhost:5000/covidDatas',
    );
    const dataRecover = {
      labels: result.data.provinsi,
      datasets: [
        {
          label: 'Recover Case',
          backgroundColor: [
            "#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900",
            "#fe4365","#fc9d9a","#f9cdad","#c8c8a9","#83af9b",
            "#ecd078","#d95b43","#c02942","#542437","#53777a",
            "#556270","#4ecdc4","#c7f464","#ff6b6b","#c44d58",
            "#774f38","#e08e79","#f1d4af","#ece5ce","#c5e0dc",
            "#e8ddcb","#cdb380","#036564","#033649","#031634",
            "#490a3d","#bd1550","#e97f02","#f8ca00","#8a9b0f",
            "#594f4f","#547980","#45ada8","#9de0ad","#e5fcc2",
          ],
          borderColor: 'white',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'black',
          data: result.data.recoverCases
        }
      ]
    };

    const optionss = {
      tooltips: {
        enabled: true,
      },
      legend: {
        display: false
      },
      scales: 
      {
        yAxes: [
          {
              barPercentage: 0.7,
              // scaleLabel: {
              //   display: true,
              //   labelString: 'Provinsi'
              // },
              ticks: {
                fontSize: 9,
                autoSkip: false,
                maxRotation: 90,
                minRotation: 20
              }
          },
        ],
        xAxes: [
          {
          scaleLabel: {
            display: true,
            labelString: 'Recover'
          }
          }
        ],
      }
    }
    var x = <HorizontalBar data={dataRecover} options={optionss}/>

    this.setState({
      chart: x
    })

  }

  render() {
  
  const { totalDeath, totalPositif, totalRecover, chart } = this.state

    return (
    <div className="App">
      <div className="bg-icon">
        <span>SIMPANSE DEV</span>
        <span className="th">2021</span>
      </div>
        <div style={{ padding: 20 }}>    
          <GridX container spacing={5}>
            <Grid item xs={3}>
              <PaperLeft>
                <ButtonLeft variant="contained" color="primary" onClick={this.positifCase.bind(this)}>
                  <div className="total">
                    {totalPositif}
                  </div>
                  <div className='title'>
                    Total Positif Case
                  </div>
                </ButtonLeft>
                <ButtonLeft variant="contained" color="primary" onClick={this.deathCase.bind(this)}>
                  <div className="total">
                    {totalDeath}
                  </div>
                  <div className='title'>
                    Total Death Case
                  </div>
                </ButtonLeft>
                <ButtonLeft variant="contained" color="primary" onClick={this.recoverCase.bind(this)}>
                  <div className="total">
                    {totalRecover}
                  </div>
                  <div className='title'>
                    Total Recover
                  </div>
                </ButtonLeft>
              </PaperLeft>
            </Grid>
            <Grid item xs={9}>
                <div className="ykgk"> 
                  {chart}
                </div>
                
            </Grid>
          </GridX>
      </div>
    </div>
    )
  }
}

export default AppMakaveli;