import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import axios from 'axios';
import styled from 'styled-components'

const Container = styled.div`
    width: 1024px;
    height: 750px;
`;

export default class NetherlandsGrowth extends React.Component {
  state = {
    covidData: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/covid/growth`)
      .then(res => {
        const covidData = res.data;
        this.setState({ covidData });
      })
  }

  formatData(data){
    let formattedData = []
    formattedData = [
        {
            id:"confirmed",
            data: [],
        },
        {
            id:"deaths",
            data: [],
        },
        // {
        //     id:"recovered",
        //     data: [],
        // }
    ]
    data.map((d => {
        formattedData[0].data.push({x: d.date, y: d.confirmed})
        formattedData[1].data.push({x: d.date, y: d.deaths})
        // formattedData[2].data.push({x: d.date, y: d.recovered})
    }))

    return formattedData;
  }

  render() {
    return (
    <>
      {/* <ul style={{padding: 0}}>
        {this.state.covidData.data && this.state.covidData.data.map(cov => <div>{cov.date.split('T')[0]} confirmed cases: {cov.confirmed}</div>)}
      </ul> */}
      <Container>
            {this.state.covidData.data && <MyResponsiveLine data={this.formatData(this.state.covidData.data)} />}
        </Container>
      </>
    )
  }
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 100, bottom: 160, left: 100 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: 'date',
            legendOffset: 80,
            legendPosition: 'middle',
            format: (v) => `${v.split('T')[0]}`
        }}
        theme={{ 
            textColor: '#ffffff',
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -80,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'category10' }}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                itemTextColor : 'white',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
            }
        ]}
    />
)