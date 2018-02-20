import React from "react"
import './Map.css'
import vd_municipalities from './vd_communes.topojson'
import * as d3 from "d3"
import * as topojson from "topojson-client";

export default class Map extends React.Component{
  constructor(props){
    super(props)

    // Initial dimensions have to be taken from the props and then updated
    this.state = {
      width: this.props.width,
      height: this.props.height,
      mapdata: [],
      currentMunicipality: null
    }
  }

  // Drawing the map in the SVG node
  renderMap(props){

    // Setting the projection
    const projection = () => {
      return d3.geoMercator()
        .rotate([0, 0])
        .center([6.607074, 46.612335])
        .scale(35000)
        .translate([this.state.width / 2, this.state.height / 2]);
    }

    // Setting the path generator
    const path = () => {
      return d3.geoPath().projection(projection())
    }

    // Binding the data to future paths
    const municipalities = d3.select(this.node)
      .selectAll('path')
      .data(this.state.mapdata)

    const that = this;

    // Adding the paths to the map
    municipalities.enter()
      .append('path')
      .attr('class', 'municipality')
      .each(function(d, i){
        d3.select(this)
          .attr("d", path(d))
          .on("mouseover", (d) => { 
            that.setState({"currentMunicipality": d.properties["Commune"]}); 
            console.log( this )
            d3.select(this).classed( "active", true ) })
          .on("mouseout", () => {
            d3.select(this).classed( "active", false ) })
      })

  }

  componentDidMount() {
    // Change the map size according to its container
    this.setState({
      width: this.node.getBoundingClientRect().width,
      height: this.node.getBoundingClientRect().width * 4 / 3});

    // Get the data
    d3.json(vd_municipalities, (error, vd) => {
      if( error ) throw error
      this.setState({mapdata: topojson.feature(vd, vd.objects.communes).features})
      this.renderMap()
    });

  }

  // ref gives a reference to the DOM element for D3 to manipulate directly
  render(){
    return (
      <svg width={this.state.width} height={this.state.height} ref={node => this.node = node}>
        <text x="0" y="100">{this.state.currentMunicipality}</text>
      </svg>
    );
  }
}

// Default map dimensions
Map.defaultProps = {
  width: 600, 
  height: 480
}