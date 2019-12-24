import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import {
  loadCategories,
  saveCategory
} from "../../redux/actions/category-actions";
// Components
import Spinner from "../common/spinner";
import TextInput from "../common/text-input";

const ManageCategoriesPage = ({ categories, loadCategories, saveCategory }) => {
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    loadCategories().catch(error => {
      console.error("Failed to load categories: ", error);
    });
  }, []);

  const handleChange = event => {
    event.preventDefault();
    setNewCategory(event.target.value);
  };

  const handleSave = () => {
    saveCategory({ name: newCategory }).catch(error => {
      console.error(`Failed to save category: `, error);
    });
  };

  return categories.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <h2 className="is-2">Your Current Categories</h2>
      <table className="table">
        <tbody>
          {categories.map(category => {
            return (
              <tr key={category.id}>
                <th>{category.id}</th>
                <td>{category.name}</td>
                <td>
                  <button className="button is-danger">Delete</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <th></th>
            <td>
              <TextInput
                name="category"
                placeholder={"Create new category"}
                onChange={handleChange}
              />
            </td>
            <td>
              <button onClick={handleSave} className="button is-success">
                Success
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

ManageCategoriesPage.propTypes = {
  categories: PropTypes.array.isRequired,
  loadCategories: PropTypes.func.isRequired,
  saveCategory: PropTypes.func.isRequired
};

const mapStateToProps = ({ categories }) => {
  return { categories };
};

const mapDispatchToProps = {
  loadCategories,
  saveCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCategoriesPage);
