import React, { Component } from "react";
import { Consumer } from "../../context";
import uuid from "uuid";
import TextInputGroup from "../layouts/TextInputGroup";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "name" && e.target.value.length < 1) {
      this.setState({
        errors: { name: "Name must NOT be empty!" }
      });
      return;
    }
    if (e.target.name === "email" && e.target.value === "") {
      this.setState({ errors: { email: "Email must NOT be empty! " } });
      return;
    }
    if (e.target.name === "name" || e.target.name === "email") {
      this.setState({
        errors: {}
      });
    }
  };
  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === "" || name.length < 5) {
      this.setState({
        errors: { name: "Name must NOT be empty or less than 5 characters!" }
      });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email must NOT be empty! " } });
      return;
    }

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };
    dispatch({
      type: "ADD_CONTACT",
      payload: newContact
    });
    this.setState({ name: "", email: "", phone: "" });
    this.props.history.push("/");
  };
  render() {
    const { name, email, phone } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3 ">
              <div className="card-header">Card Body</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Enter Name ..."
                    onChange={this.onChange}
                    error={this.state.errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    value={email}
                    placeholder="Enter email ..."
                    type="email"
                    onChange={this.onChange}
                    error={this.state.errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter Phone ..."
                    onChange={this.onChange}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
