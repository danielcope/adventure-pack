import React, { Component } from "react";
import axios from "axios";
import { getCharacterArr } from "../../redux/charReducer";
import { connect } from "react-redux";
import AddChar from "./AddChar";
import CharNav from "./CharNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faScroll, faBox } from "@fortawesome/free-solid-svg-icons";

import "../trash.css";
import "./Character.css";
import ConfirmDelete from "../utils/ConfirmDelete/ConfirmDelete";

class Character extends Component {
  constructor() {
    super();
    this.state = {
      healthAddSub: 0,
      showDelete: false,
    };
  }

  componentDidMount = () => {
    this.getCharacter();
  };

  showDelete = () => {
    this.setState({ showDelete: !this.showDelete });
  };

  getCharacter = async () => {
    await axios
      .get("/api/character")
      .then((res) => this.props.getCharacterArr(res.data))
      .catch((err) => console.log(err));
  };

  getBackpack = async () => {};

  deleteChar = (char_id) => {
    axios
      .delete(`/api/sacrifice/${char_id}`)
      .then((res) => {
        this.getCharacter();
        console.log("hit");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const mappedCharArr = this.props.charReducer.character.map((ele, i) => (
      <section key={ele.char_id} className="char-container">
        <section className="name-trash-container">
          <h2 className="name-text text">{ele.name}</h2>
          <div
            className="icon-trash"
            onClick={() => this.deleteChar(ele.char_id)}
          >
            <div className="trash-lid"></div>
            <div className="trash-container"></div>
            <div className="trash-line-1"></div>
            <div className="trash-line-2"></div>
            <div className="trash-line-3"></div>
          </div>
        </section>

        <section className="char-options">
          <Link
            className="option text"
            to={`/individualcharacter/${ele.char_id}`}
          >
            Stats
            <FontAwesomeIcon icon={faScroll} className="scroll" />
          </Link>
          <Link className="option text" to={`/backpack/${ele.char_id}`}>
            Backpack
            <FontAwesomeIcon className="backpack" icon={faBox} />
          </Link>
          <Link to={`spellbook/${ele.char_id}`} className="option text">
            Spells <FontAwesomeIcon icon={faBook} className="spellbook" />
          </Link>
        </section>
      </section>
    ));

    return (
      <div className="char-view">
        {this.showDelete ? <ConfirmDelete /> : <div></div>}
        <CharNav />
        <AddChar getCharacter={this.getCharacter} />

        <h5 className="my-characters-header text">My Characters</h5>

        <section className="mapped-char">{mappedCharArr}</section>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getCharacterArr })(Character);
