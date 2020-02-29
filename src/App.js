import React from "react";
import Sidebar from "react-sidebar";
import { Container, Row, Col } from 'reactstrap';
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePieCanvas } from '@nivo/pie'
import {pie_data, line_data, line_pos_neg,activity_pie_data} from "./data";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
        selected: 0,
      currentTopic:"ACTF"
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

    changeTitle = (title) => {
        this.setState(
            { currentTopic: title,
                sidebarOpen: false }
            );
    }

    changeColor = (number) => {
        this.setState(
            { selected: number}
        );
    }

    myColor =(position) => {
        if (this.state.selected === position) {
            return "grey";
        }
        return "";
    }

  render() {
    return (
        <Sidebar
            sidebar={
              <div styles={{ height: '500px', width:'500px', overflowY: 'scroll', flexDirection: 'column' }} >
              <Row>
              <h2 style={{background: this.myColor(0)}} onClick={() => this.changeTitle("ACTF")} onMouseEnter={() => this.changeColor(0)}>
                ACTF
              </h2>
              </Row>
              <Row>
              <h2 style={{background: this.myColor(1)}} onClick={() => this.changeTitle("Coronavirus")} onMouseEnter={() => this.changeColor(1)}>
                Coronavirus
              </h2>
              </Row>
              <Row>
              <h2 style={{background: this.myColor(2)}} onClick={() => this.changeTitle("Housing")} onMouseEnter={() => this.changeColor(2)}>
                Housing
              </h2>
              </Row>
              <Row>
              <h2 style={{background: this.myColor(3)}} onClick={() => this.changeTitle("Recruiting")} onMouseEnter={() => this.changeColor(3)}>
                Recruiting
              </h2>
              </Row>
              </div>
            }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
        >
            <h1>
                {this.state.currentTopic}
            </h1>
            <button onClick={() => this.onSetSidebarOpen(true)}>
                Select topic
            </button>
            <React.Fragment>
                <h2>Activities</h2>
                {piechart(pie_data)}
                {piechart(activity_pie_data)}
                {linechart(line_data)}
                {linechart(line_pos_neg)}
            </React.Fragment>
        </Sidebar>
    );
  }
}
function linechart(data) {
    return (
        <ResponsiveLine
            data={data}
            curve="natural"
            // width={1000}
            // height={500}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
                format: "%b %d"
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'activity count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            margin={{
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            }}
            yScale={{
                type: "linear",
                stacked: false,
                min: 0,
                max: "auto"
            }}
            xScale={{
                type: "time",
                precision: "day",
                format: "native"
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
}

function piechart(data) {
    return (
        <ResponsivePieCanvas
            data={data}
            margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
            pixelRatio={2}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'paired' }}
            width={800}
            height={800}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    translateX: 140,
                    itemWidth: 60,
                    itemHeight: 14,
                    itemsSpacing: 2,
                    symbolSize: 14,
                    symbolShape: 'circle'
                }
            ]}
        />
    )
}
// const styles = StyleSheet.create({
//
// });

export default App;
