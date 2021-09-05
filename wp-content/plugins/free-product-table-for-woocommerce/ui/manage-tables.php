<?php
include_once plugin_dir_path(__FILE__).'../inc/Activation.php';
include_once  plugin_dir_path(__FILE__).'../inc/config.php';

use \BinaryCarpenter\PFW\Config as Config;
use \BinaryCarpenter\PFW\Activation as Activation;

?>

<script>
    <?php echo "let pfwPro = " . (Config::PFW_IS_PRO ? 'true' : 'false'). ";";  ?>
    <?php echo "let pfwActivated = " . ( Activation::is_activated(Config::KEY_CHECK_ACTIVATION) ? 'true' : 'false') . ";";  ?>
</script>


<div class="bc-box" id="pfw-manage-tables">
    <div class="container-fluid">
        <div class="row">
            <div class="col-2" id="table-list-container">
                <a href="" class="button button-primary">Create new table</a>
                <h3>Tables</h3>
                <ul id="table-list">

                </ul>

                <div id="help-area">
                    <a href="https://www.youtube.com/playlist?list=PL6rw2AEN42ErWSxMdeRXOAcqgMRMSgpQd" target="_blank">
                    <h2>Tutorial</h2>
                    <img src="data:image/png;base64,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" alt="">


                    </a>
                </div>
            </div>

            <div class="col-10">
                <div class="container-fluid">
                    <label for="table-name">Table name</label>
                    <input type="text" id="table-name" placeholder="table's name">
                    <div class="row">
                        <div class="col-4">

                            <div class="container">
                                <h2>Available fields</h2>
                                <div id="elements-list" class="">

                                    <ul class="tab-head">
                                        <li><a href="#common-elements">Common</a></li>
                                        <li><a href="#extra-elements">Extra</a></li>
                                    </ul>

                                    <div id="common-elements">
                                        <!--   data-title is the actual title display on the table -->
                                        <div data-field="name" data-title="Product Name" class="pfw-woo-element">Product name</div>
                                        <div data-field="image" data-title="Image" class="pfw-woo-element">Image</div>
                                        <div data-field="price" data-title="Price" class="pfw-woo-element">Price</div>
                                        <div data-field="add-to-cart" data-title="Add to cart" class="pfw-woo-element">Add to cart button</div>
                                        <div data-field="categories" data-title="Categories" class="pfw-woo-element">Categories</div>
                                        <div data-field="tags" data-title="Tags" class="pfw-woo-element">Tags</div>
                                        <!--                        <li data-field="review" data-title="Review" class="pfw-woo-element">Review</li>-->
                                        <div data-field="rating" data-title="Rating" class="pfw-woo-element">Rating</div>
                                        <div data-field="sale-price" data-title="Sale price" class="pfw-woo-element">Sale price</div>
                                        <div data-field="total-sales" data-title="Total sales" class="pfw-woo-element">Total sales</div>
                                        <div data-field="stock" data-title="Stock" class="pfw-woo-element">Stock quantity</div>
                                        <div data-field="checkbox" data-type="premium" data-title="Checkbox" class="pfw-woo-element">Checkbox</div>
                                    </div>

                                    <div id="extra-elements">

                                        <div data-field="weight" data-title="Weight" class="pfw-woo-element">Weight</div>
                                        <div data-field="product_length" data-title="Length" class="pfw-woo-element">Length</div>
                                        <div data-field="width" data-title="Width" class="pfw-woo-element">Width</div>
                                        <div data-field="height" data-title="Height" class="pfw-woo-element">Height</div>
                                        <div data-field="sku" data-title="SKU" class="pfw-woo-element">SKU</div>
                                        <div data-field="dimensions" data-title="Dimensions" class="pfw-woo-element">Dimensions</div>
                                        <div data-field="description" data-title="Description" class="pfw-woo-element">Description</div>
                                        <div data-field="short-description" data-title="Short Description" class="pfw-woo-element">Short desc</div>


<!--                                        <div data-field="tax-status" data-title="Tax status" class="pfw-woo-element">Tax status</div>-->
<!--                                        <div data-field="tax-class" data-title="Tax class" class="pfw-woo-element">Tax class</div>-->
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="col-4">
                            <h2>Fields to display</h2>
                            <p>You can drag the fields to change their orders</p>
                            <div id="active-field">

                            </div>
                        </div>

                        <div class="col-4">
                            <div id="table-settings">
                                <ul class="tab-head">
                                    <li><a href="#general-settings">General</a></li>
                                    <li><a href="#styles-settings">Styles</a></li>
                                </ul>
                                <div id="general-settings">


                                    <h4>Products to display</h4>
                                    <?php

                                    $taxonomy     = 'product_cat';
                                    $orderby      = 'name';
                                    $show_count   = 0;      // 1 for yes, 0 for no
                                    $pad_counts   = 0;      // 1 for yes, 0 for no
                                    $hierarchical = 1;      // 1 for yes, 0 for no
                                    $title        = '';
                                    $empty        = 0;
                                    $args = array(
                                        'taxonomy'     => $taxonomy,
                                        'orderby'      => $orderby,
                                        'show_count'   => $show_count,
                                        'pad_counts'   => $pad_counts,
                                        'hierarchical' => $hierarchical,
                                        'title_li'     => $title,
                                        'hide_empty'   => $empty
                                    );

                                    $cats = get_categories($args);

                                    ?>
                                    <select name="categories[]" multiple="multiple" id="product-category">
                                        <?php foreach($cats as $cat): ?>
                                            <option value="<?php echo $cat->cat_ID; ?>"><?php echo $cat->name; ?></option>

                                        <?php endforeach; ?>
                                    </select>


                                    <h3>Table options</h3>
                                    <label for="number-of-products">Number of product per page</label>
                                    <input type="number" id="number-of-products" name="number-of-products">
                                    <!--                            <label for="on-product-click">On product click</label>-->
                                    <!--                            <select name="on-product-click" id="on-product-click">-->
                                    <!--                                <option value="open_link">Open product in new tab</option>-->
                                    <!--                                <option value="open_light_box">Open product in light box</option>-->
                                    <!--                            </select>-->


                                    <!--                    <label for="display-export-options">Display export options</label>-->
                                    <!--                    <span><input type="checkbox" name="export_option" value="pdf"> PDF</span>-->
                                    <!--                    <span><input type="checkbox" name="export_option" value="xlsx"> Excel</span>-->
                                    <!--                    <span><input type="checkbox" name="export_option" value="csv"> CSV</span>-->

                                    <h3 for="display-export-options">Display filters</h3>
                                    <?php pfw_display_pro_message_simple('display-filter-feature'); ?>
                                    <!-- enter list of filters here, based on user input fields-->
<!--                                    <div class="pfw-filter-option" data-field="name">-->
<!--                                        <label for="">Name filter</label>-->
<!--                                        <input --><?php //pfw_show_disabled_on_free(); ?><!--  type="checkbox" name="filter_option" value="name"> Show name filter-->
<!--                                        <input --><?php //pfw_show_disabled_on_free(); ?><!--  data-label="name" type="text" class="filter-label" placeholder="Label">-->
<!--                                    </div>-->
                                    <div class="pfw-filter-option" data-field="rating">

                                        <label for="">Rating filter</label>
                                        <input <?php pfw_show_disabled_on_free(); ?> type="checkbox" name="filter_option" value="rating"> Show rating filter
                                        <input <?php pfw_show_disabled_on_free(); ?>  data-label="rating" type="text" class="filter-label" placeholder="Label">

                                    </div>
                                    <div class="pfw-filter-option" data-field="price">
                                        <label for="">Price filter</label>
                                        <input <?php pfw_show_disabled_on_free(); ?>  type="checkbox" name="filter_option" value="price"> Show price filter
                                        <input <?php pfw_show_disabled_on_free(); ?>  data-label="price" type="text" class="filter-label" placeholder="Label">
                                    </div>

                                    <div class="pfw-filter-option" data-field="price">
                                        <label for="">Categories filter</label>
                                        <input <?php pfw_show_disabled_on_free(); ?>  type="checkbox" name="filter_option" value="categories"> Show categories filter
                                        <input <?php pfw_show_disabled_on_free(); ?>   data-label="categories" type="text" class="filter-label" placeholder="Label">
                                    </div>
                                    <!--                    <span><input type="checkbox" name="filter_option" value="categories"> Categories</span>-->


                                    <h3>Sorting order</h3>
                                    <label for="">Sort the products by</label>
                                    <select name="sort-by" id="sort-by">
                                        <option value="ID">Product ID</option>
                                        <option value="title">Product Title</option>
                                        <option value="type">Product Type</option>
                                        <option value="modified">Product last modified date</option>
                                        <option value="rand">Random order</option>
                                        <option value="date">Product's date created</option>

                                    </select>

                                    <label for="">Order</label>
                                    <select name="sorting-order" id="sorting-order">
                                        <option value="ASC">Ascending</option>
                                        <option value="DESC">Descending</option>
                                    </select>


                                </div>

                                <div id="styles-settings">
                                    <label for="">Select table styles</label>
                                    <?php pfw_display_pro_message_simple('select-table-styles'); ?>
                                    <select name="" <?php pfw_show_disabled_on_free(); ?> id="pfw-table-style-select">
                                        <option value="">Default style</option>
                                        <option value="pfw-table-style-1">Style 1 (blue)</option>
                                        <option value="pfw-table-style-2">Style 2 (clean)</option>
                                        <option value="pfw-table-style-3">Style 3(dark)</option>
                                        <option value="pfw-table-style-4">Style 4</option>
                                        <option value="pfw-table-style-5">Style 5</option>
                                        <option value="pfw-table-style-6">Style 6</option>

                                    </select>
                                </div>

                            </div>


                        </div>
                    </div>

                    <button id="create-table-button" class="button button-primary">Create/Save table</button>

                </div>

            </div>


        </div>
    </div>




</div>

<div id="modal-editor"></div>

<?php

include_once plugin_dir_path(__FILE__). '../inc/editor.phtml';
