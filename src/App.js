import React from "react";
import Cards from "./Components/Cards/Cards";
import Chart from "./Components/Chart/Chart";
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <br />
        <text>
          <b>Casos de COVID-19 no Mundo e em Países especificos</b>
        </text>
        <br />
        <text>
          <i>(Para fazer a busca de um determinado País, selecione abaixo)</i>
        </text>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <br />
        <br />
        <Cards data={data} country={country} />
        
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

