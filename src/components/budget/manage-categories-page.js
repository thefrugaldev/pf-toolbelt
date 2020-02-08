import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import {
  loadCategories,
  saveCategory,
  deleteCategory
} from "../../redux/actions/category-actions";
// Components
import Spinner from "../common/spinner";
import TextInput from "../common/forms/text-input";
import IconPicker from "../common/icon-picker";

const ManageCategoriesPage = ({
  categories,
  loadCategories,
  saveCategory,
  deleteCategory
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState();

  useEffect(() => {
    loadCategories().catch(error => {
      console.error("Failed to load categories: ", error);
    });
  }, []);

  const handleChange = (event, icon) => {
    icon ? setSelectedIcon(icon) : setNewCategory(event.target.value);
  };

  const handleSave = () => {
    saveCategory({ name: newCategory }).catch(error =>
      console.error(`Failed to save category: `, error)
    );
  };

  const handleDelete = category => {
    deleteCategory(category).catch(error =>
      console.error(`Failed to delete category: `, error)
    );
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
              <tr key={category._id}>
                <th>{category._id}</th>
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => handleDelete(category)}
                    className="button is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <th></th>
            <td>
              <IconPicker onChange={handleChange} />
              <TextInput
                name="category"
                placeholder={"Create new category"}
                onChange={handleChange}
              />
            </td>
            <td>
              <button onClick={handleSave} className="button is-success">
                Save
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
  saveCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

const mapStateToProps = ({ categories }) => {
  return { categories };
};

const mapDispatchToProps = {
  loadCategories,
  saveCategory,
  deleteCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCategoriesPage);
