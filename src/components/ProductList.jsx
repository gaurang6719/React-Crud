import { Pencil, Plus, Printer, Search, Settings, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import Modal from "./Modal";
import Setting from "./Setting";
import Pagination from "./Pagination";
import { dummyData } from "./Data";

const ProductList = () => {
  // State variables
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedOpen, setIsSelectedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    ProductName: true,
    description: true,
    productImage: true,
    price: true,
    discount: true,
    available: true,
  });

  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  // Populate dummy data initially
  useEffect(() => {
    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify(dummyData));
      setProducts(dummyData);
    }
  }, []);

  // Prevent scrolling when overlays are open
  useEffect(() => {
    const shouldBlockScroll = isDrawerOpen || isSettingOpen || isModalOpen;
    document.body.classList.toggle("no-scroll", shouldBlockScroll);
    return () => document.body.classList.remove("no-scroll");
  }, [isDrawerOpen, isSettingOpen, isModalOpen]);

  const handleSave = async (product) => {
    if (editProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editProduct.id
          ? {
              ...product,
              id: editProduct.id, // Preserve original ID
              available:
                product.category?.toLowerCase() === "available" ? "Yes" : "No",
            }
          : p
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      toast.success("Product updated successfully");
      setIsDrawerOpen(false);
      setEditProduct(null);
    } else {
      const newProduct = {
        ...product,
        available:
          product.category?.toLowerCase() === "available" ? "Yes" : "No",
      };
      const newProducts = [...products, newProduct].map((p, index) => ({
        ...p,
        id: index + 1,
      }));
      setProducts(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
      toast.success("Product added successfully");
      setIsDrawerOpen(false);
    }
  };

  const handleDelete = () => {
    const updatedProducts = products
      .filter((product) => product.id !== idToDelete)
      .map((p, index) => ({
        ...p,
        id: index + 1,
      }));

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.info("Product deleted successfully");
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  const handleSettingSave = useCallback((checkedItems) => {
    setVisibleColumns(checkedItems);
  }, []);

  // Filtered data based on search
  const filteredData = useMemo(() => {
    return products.filter(
      (product) =>
        (product.name?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (product.description?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        product.price?.toString().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  // Pagination logic on filtered data
  const totalPages = Math.ceil(filteredData.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemPerPage);

  return (
    <div className="container">
      <div className="product-header">
        <p className="product-count">{filteredData.length} Products</p>

        <div className="product-actions">
          <div className="search-box">
            <span className="search-icon">
              <Search />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
          </div>

          <div className="icon-box">
            <Printer />
          </div>
          <div className="icon-box" onClick={() => setIsSettingOpen(true)}>
            <Settings />
          </div>
          <div
            className="icon-box plus"
            onClick={() => {
              setEditProduct(null);
              setIsDrawerOpen(true);
            }}
          >
            <Plus />
          </div>
        </div>
      </div>

      <div
        className="table-header"
        style={{
          "--columns": `
            ${visibleColumns.id ? "0.5fr " : ""}
            ${visibleColumns.ProductName ? "1.5fr " : ""}
            ${visibleColumns.description ? "2fr " : ""}
            ${visibleColumns.productImage ? "1.5fr " : ""}
            ${visibleColumns.price ? "1fr " : ""}
            ${visibleColumns.discount ? "1fr " : ""}
            ${visibleColumns.available ? "1fr " : ""}
            1fr`,
        }}
      >
        {visibleColumns.id && <div className="cell">ID</div>}
        {visibleColumns.ProductName && <div className="cell">Product Name</div>}
        {visibleColumns.description && <div className="cell">Description</div>}
        {visibleColumns.productImage && (
          <div className="cell">Product Image</div>
        )}
        {visibleColumns.price && <div className="cell">Price</div>}
        {visibleColumns.discount && <div className="cell">Discount</div>}
        {visibleColumns.available && <div className="cell">Available</div>}
        <div className="cell">Action</div>
      </div>

      <div className="product-table">
        {currentData.map((product) => (
          <div
            className="table-row"
            key={product.id}
            style={{
              "--columns": `
                ${visibleColumns.id ? "0.5fr " : ""}
                ${visibleColumns.ProductName ? "1.5fr " : ""}
                ${visibleColumns.description ? "2fr " : ""}
                ${visibleColumns.productImage ? "1.5fr " : ""}
                ${visibleColumns.price ? "1fr " : ""}
                ${visibleColumns.discount ? "1fr " : ""}
                ${visibleColumns.available ? "1fr " : ""}
                1fr`,
            }}
          >
            {visibleColumns.id && (
              <div className="cell" data-label="ID">
                {product.id}
              </div>
            )}
            {visibleColumns.ProductName && (
              <div className="cell" data-label="Product Name">
                {product.name}
              </div>
            )}
            {visibleColumns.description && (
              <div className="cell" data-label="Description">
                {product.description}
              </div>
            )}
            {visibleColumns.productImage && (
              <div className="cell" data-label="Image">
                {product.image && (
                  <img
                    src={product.image}
                    alt="Product"
                    className="product-image"
                  />
                )}
              </div>
            )}
            {visibleColumns.price && (
              <div className="cell" data-label="Price">
                ${product.price}
              </div>
            )}
            {visibleColumns.discount && (
              <div className="cell" data-label="Discount">
                {product.discount}%
              </div>
            )}
            {visibleColumns.available && (
              <div className="cell" data-label="Available">
                <span
                  className={`status-indicator ${
                    product.available.toLowerCase() === "yes" ? "green" : "red"
                  }`}
                ></span>
              </div>
            )}
            <div className="cell" data-label="Action">
              <div className="action-buttons">
                <button
                  className="btn edit"
                  aria-label="Edit product"
                  onClick={() => {
                    setEditProduct(product);
                    setIsDrawerOpen(true);
                  }}
                >
                  <Pencil />
                </button>
                <button
                  className="btn delete"
                  onClick={() => {
                    setIdToDelete(product.id);
                    setIsModalOpen(true);
                  }}
                  aria-label="Delete product"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="no-data-message">
          <Search /> No data found
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
        itemPerPage={itemPerPage}
        setItemPerPage={setItemPerPage}
        filteredData={filteredData}
        isSelectedOpen={isSelectedOpen}
        setIsSelectedOpen={setIsSelectedOpen}
      />

      <AddProduct
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        handleSave={handleSave}
        editProduct={editProduct}
      />

      <Setting
        isSettingOpen={isSettingOpen}
        onSettingClose={() => setIsSettingOpen(false)}
        handleSettingSave={handleSettingSave}
      />

      <Modal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProductList;
