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
import TextInput from "../common/forms/text-input";
import IconPicker from "../common/icon-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ManageCategoriesPage = ({
  categories,
  loadCategories,
  saveCategory,
  deleteCategory
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    loadCategories().catch(error => {
      console.error("Failed to load categories: ", error);
    });
  }, []);

  const handleChange = (event, icon) => {
    icon ? setSelectedIcon(icon) : setNewCategory(event.target.value);
  };

  const handleSave = () => {
    saveCategory({ name: newCategory, icon: selectedIcon }).catch(error =>
      console.error(`Failed to save category: `, error)
    );
    setSelectedIcon("");
    setNewCategory("");
  };

  const handleDelete = category => {
    deleteCategory(category).catch(error =>
      console.error(`Failed to delete category: `, error)
    );
  };

  return (
    <>
      {categories.length === 0 ? (
        <h2 className="title">No Categories. Create One Below</h2>
      ) : (
        <>
          <h2 className="title has-text-centered">Your Current Categories</h2>
          <div className="columns is-centered">
            <div className="column is-narrow">
              <table className="table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Category Name</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {categories.map(category => {
                    return (
                      <tr key={category._id}>
                        <td>
                          {category.icon ? (
                            <span className="icon has-text-info is-large">
                              <FontAwesomeIcon icon={category.icon} />
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
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
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <div className="field is-grouped columns is-centered m-t-lg">
        <div className="control">
          <IconPicker onChange={handleChange} />
          {selectedIcon && (
            <span className="icon has-text-info is-large">
              <FontAwesomeIcon icon={selectedIcon} size="2x" />
            </span>
          )}
        </div>
        <div className="control">
          <TextInput
            name="category"
            placeholder={"Category Name"}
            onChange={handleChange}
            value={newCategory}
          />
        </div>
        <div className="control">
          <button onClick={handleSave} className="button is-success">
            Save
          </button>
        </div>
      </div>
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
