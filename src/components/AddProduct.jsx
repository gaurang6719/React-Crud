import { ChevronDown, ChevronUp, Plus, TriangleAlert, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const AddProduct = ({ isOpen, onClose, handleSave, editProduct }) => {
  const [isSelectedOpen, setIsSelectedOpen] = useState(false);
  const [error, setError] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (editProduct) {
      setFormValues({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        discount: editProduct.discount || "",
        image: editProduct.image || null,
        category:
          editProduct.available?.toLowerCase() === "yes"
            ? "available"
            : "unavailable",
      });
      setPreviewImage(editProduct.image || null);
    } else {
      setFormValues({
        name: "",
        description: "",
        price: "",
        discount: "",
        image: null,
        category: "",
      });
      setPreviewImage(null);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      // Create a FileReader to convert the image to a Base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prev) => ({ ...prev, image: reader.result }));
        setPreviewImage(reader.result); // Set the preview image to the Base64 string
      };
      reader.readAsDataURL(file); // Read the file as a Base64 string
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value}));
      
    }

    const isFilled = e.target.value;
    if (isFilled) {
      setError((prev) => ({ ...prev, [name]: "" }));
    } else {
      setError((prev) => ({ ...prev, [name]: `${name} is required` }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.name.trim()) newErrors.name = "Product name is required";
    // if (!formValues.name) {
    //   setError((prev) => ({ ...prev, name: "Name is required" }));  
    // }
    if (!formValues.description.trim())
      newErrors.description = "Description is required";

    if (!formValues.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formValues.price)) {
      newErrors.price = "Price must be a number";
    }

    if (!formValues.discount.trim()) {
      newErrors.discount = "Discount is required";
    } else if (isNaN(formValues.discount)) {
      newErrors.discount = "Discount must be a number";
    }

    if (!formValues.category) newErrors.category = "Category is required";
    if (!formValues.image) newErrors.image = "Image is required";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSave(formValues);
      setFormValues({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        image: "",
      });
      setError({});
    }
    setPreviewImage(null);
  };

  return (
    <>
      {isOpen && <div className="drawer-backdrop" onClick={onClose}></div>}

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Form</h3>
          <button type="button" className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <form className="add-product-form" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={formValues.name}
            onChange={handleChange}
          />
          {error.name && (
            <p className="error">
              <TriangleAlert />
              {error.name}
            </p>
          )}

          <textarea
            name="description"
            rows="3"
            cols="10"
            placeholder="Description"
            value={formValues.description}
            onChange={handleChange}
          ></textarea>
          {error.description && (
            <p className="error">
              <TriangleAlert />
              {error.description}
            </p>
          )}

          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formValues.price}
            onChange={handleChange}
          />
          {error.price && (
            <p className="error">
              <TriangleAlert />
              {error.price}
            </p>
          )}

          <input
            type="text"
            name="discount"
            placeholder="Discount"
            value={formValues.discount}
            onChange={handleChange}
          />
          {error.discount && (
            <p className="error">
              <TriangleAlert />
              {error.discount}
            </p>
          )}

          <div className="select-wrapper">
            <div className="select-container">
              <select
                name="category"
                value={formValues.category}
                onChange={(e) => handleChange(e)}
                onClick={() => setIsSelectedOpen((prev) => !prev)}
                // onBlur={() => setIsSelectedOpen(false)}
              >
                <option value="" disabled hidden>
                  Select Category
                </option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              {isSelectedOpen ? (
                <ChevronUp className="chevron-icon" />
              ) : (
                <ChevronDown className="chevron-icon" />
              )}
            </div>
            {error.category && (
              <p className="error" style={{ marginTop: "5px" }}>
                <TriangleAlert />
                {error.category}
              </p>
            )}
          </div>

          <p className="p-image">Upload Image</p>
          <label className="img-square">
            <Plus />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </label>
          {previewImage && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px" }}
              />
            </div>
          )}

          {error.image && (
            <p className="error">
              <TriangleAlert />
              {error.image}
            </p>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{editProduct ? "Update" : "Save"}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
