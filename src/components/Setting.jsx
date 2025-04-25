import { X, Check, TriangleAlert } from "lucide-react";
import React, { useState } from "react";

const Setting = ({ isSettingOpen, onSettingClose, handleSettingSave }) => {
  const checkboxFields = [
    { key: "id", label: "ID" },
    { key: "ProductName", label: "PRODUCT NAME" },
    { key: "description", label: "DESCRIPTION" },
    { key: "productImage", label: "PRODUCT IMAGE" },
    { key: "price", label: "PRICE" },
    { key: "discount", label: "DISCOUNT" },
    { key: "available", label: "AVAILABILITY" },
  ];

  const [checkedItems, setCheckedItems] = useState({
    id: false,
    ProductName: false,
    description: false,
    productImage: false,
    price: false,
    discount: false,
    available: false,
  });

  const [error, setError] = useState({});

  const validate = () => {
    const isAnyChecked = Object.values(checkedItems).some((value) => value);
    if (!isAnyChecked) {
      setError({ checkbox: "Please select at least one field." });
      return false;
    }

    setError({});
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSettingSave(checkedItems);

      // Optional: Reset checkboxes
      setCheckedItems({
        id: false,
        ProductName: false,
        description: false,
        productImage: false,
        price: false,
        discount: false,
        available: false,
      });
      onSettingClose();
    }
  };

  const handleCheckboxChange = (field) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [field]: !checkedItems[field],
    };

    setCheckedItems(updatedCheckedItems);

    // Clear error if any checkbox is now checked
    const isAnyChecked = Object.values(updatedCheckedItems).some(
      (value) => value
    );
    if (isAnyChecked) {
      setError({});
    }
  };

  return (
    <>
      {isSettingOpen && (
        <div className="drawer-backdrop" onClick={onSettingClose}></div>
      )}

      <div className={`drawer ${isSettingOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Setting</h3>
          <button type="button" className="close-btn" onClick={onSettingClose}>
            <X />
          </button>
        </div>
        <form className="add-product-form" onSubmit={onSubmit}>
          <div className="checkbox-list">
            {checkboxFields.map(({ key, label }) => (
              <div key={key} className="checkbox-item">
                <label className="custom-checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={checkedItems[key]}
                    onChange={() => handleCheckboxChange(key)}
                  />
                  <span className="custom-checkbox">
                    {checkedItems[key] && <Check className="check-icon" />}
                  </span>
                  <span className="checkbox-label">{label}</span>
                </label>
              </div>
            ))}
          </div>

          {error.checkbox && (
            <div className="error-message">
              <TriangleAlert className="error-icon" size={16} />
              <span>{error.checkbox}</span>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onSettingClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setting;
