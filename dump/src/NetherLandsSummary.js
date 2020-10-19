import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import axios from 'axios';
import styled from 'styled-components'

const Container = styled.div`
    width: 800px;
    height: 500px;
`;

export default class NetherLandsSummary extends React.Component {
  state = {
    covidData: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/covid/covid`)
      .then(res => {
        const covidData = res.data;
        this.setState({ covidData });
      })
  }

  render() {
    return (
    <>
      <ul style={{padding: 0}}>
        {this.state.covidData.data && this.state.covidData.data.map(cov => <div>{cov.date.split('T')[0]} confirmed cases: {cov.confirmed}</div>)}
      </ul>
      <Container>
            {/* <h1>test</h1> */}
            {this.state.covidData.data && <MyResponsiveBar data={this.state.covidData.data} />}
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
const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={['confirmed']}
        indexBy="date"
        margin={{ top: 50, right: 0, bottom: 160, left: 100 }}
        padding={0.3}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'date',
            legendPosition: 'middle',
            legendOffset: 60,
            format: (v) => `${v.split('T')[0]}`
        }}
        theme={{ 
            textColor: '#ffffff',
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Confirmed Deaths',
            legendPosition: 'middle',
            legendOffset: -80,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)