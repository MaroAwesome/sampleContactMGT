import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layouts/TextInputGroup";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.contact.id,
      name: props.contact.name,
      email: props.contact.email,
      phone: props.contact.phone,
      errors: {}
    };
  }

  editContact = (conatct, dispatch) => {
    dispatch({
      type: "EDIT_CONTACT",
      payload: conatct
    });
    this.props.editContact();
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

  render() {
    console.log(this.state);
    const { name, email, phone } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div>
              <div className="form-group">
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
                  value="Update Contact"
                  className="btn btn-light btn-block"
                  onClick={this.editContact.bind(this, this.state, dispatch)}
                />
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
