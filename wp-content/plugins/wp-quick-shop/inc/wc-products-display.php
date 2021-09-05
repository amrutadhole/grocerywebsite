<?php
    if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
    global $woocommerce, $wpqs_pro;




$wpqs_custom_field = get_option('wpqs_custom_field', array());
    $is_custom_field = array_key_exists('active', $wpqs_custom_field);
    if(!$is_custom_field || !$wpqs_pro){

        wpqs_unset_custom_field_session();
    }

    if(!in_array('woocommerce', $wpqs_enabled)){
        return false;
    }
    $wpqse = wpqs_enabled();
    if(empty($wpqse)){
        echo __('Shopping cart is not ready yet.', 'wp-quick');
        return false;
    }

    $cart_url = wc_get_cart_url();
    $items = $woocommerce->cart->get_cart();
    $shop_page_url = get_permalink( wc_get_page_id( 'shop' ) );

    $added_items = array();
    if(!empty($items)){
        foreach($items as $item => $values) {
            $added_items[$values['product_id']] = $values['quantity'];
        }
    }
    $args = array(
        'posts_per_page'   => -1,
        'offset'           => 0,
        'orderby'          => 'title',
        'order'            => 'ASC',
        'post_type'        => 'product',
        'post_status'      => 'publish',
        'suppress_filters' => true,

    );


    if(function_exists('wpqs_posts')){ $args = wpqs_posts($args, $sc_args); }
    //pree($args);
    $prdocuts_array = get_posts( $args );
    if(!empty($prdocuts_array)){

    ?>
    <div class="wp-quick-instructions">
    <?php echo wpqs_settings('instructions', true); ?>
    </div>
    <form action="<?php echo $cart_url; ?>" method="post" style="max-width: 100%">
    <?php wp_nonce_field( 'qs_bulk', 'qs_bulk_field' ); ?>
    <div class="qs-box">



        <div class="box-content">


          <div class="box-product qs-content" id="quickshop-<?php echo date('Y'); ?>">

            <div id="no-more-tables">

                <?php do_action('wpqs_before_qs_table') ?>

          <table class="qs-table table w-100" style="width:100%;">
          <thead class="bg-dark text-white">
            <tr>
                    <td class="qs-center text-center"><?php echo __('Image', 'wp-quick'); ?></td>
                    <td colspan="3" class="qs-title"><?php echo __('Item', 'wp-quick'); ?></td>
                    <td class="qs-price"><?php echo __('Price', 'wp-quick'); ?></td>
                    <td class="qs-qty"><?php echo __('Qty', 'wp-quick'); ?></td>
                    <td class="qs-stock"><?php echo __('Stock', 'wp-quick'); ?></td>
                    <?php if($is_custom_field && $wpqs_pro) {?>
                         <td><?php echo __($wpqs_custom_field['label'], 'wp-quick'); ?></td>
                    <?php } ?>
                    <td class="qs-buy"></td>
            </tr>
          </thead>
              <tbody>



              <?php

        $minimum_order_quantity = 0;
        $maximum_order_quantity = 0;



        foreach($prdocuts_array as $products){

//            $product = new WC_Product($products->ID);
            $product = new WC_Product_Variable($products->ID);

            $price = (float)$product->get_price();

            if($price<=0)
            continue;

            if(function_exists('wpbo_get_applied_rule_obj')){
                $rule = wpbo_get_applied_rule_obj($product);

                if(function_exists('wpbo_get_value_from_rule')){

                    $minimum_order_quantity = wpbo_get_value_from_rule('min', $product, $rule);
                    $minimum_order_quantity = ($minimum_order_quantity>0?$minimum_order_quantity:0);

                }

            }


            if(array_key_exists($products->ID, $added_items)){
                $minimum_order_quantity = $added_items[$products->ID];
            }

            if(function_exists('wpbo_get_applied_rule_obj')){
                if(function_exists('wpbo_get_value_from_rule')){


                    $maximum_order_quantity = wpbo_get_value_from_rule('max', $product, $rule);
                    $maximum_order_quantity = ($maximum_order_quantity>0?$maximum_order_quantity:0);

                }
                //pre($minimum_order_quantity);
            }
            //pre($product);
            $stock = $product->get_stock_quantity();
            $stock = ($stock>0?$stock:__('Available', 'wp-quick'));

    ?>
              <tr id="product-<?php echo $products->ID; ?>" class="<?php echo $product->has_child() ? 'qs_var_product': '';?>" data-product="<?php echo $products->ID; ?>">

                    <td data-title="Image" class="qs-center text-center">

                        <?php $featured_image = wp_get_attachment_image_src( get_post_thumbnail_id($products->ID)); ?>
                        <?php if($featured_image) { //pre($featured_image);?>
                        <a href="<?php echo get_the_permalink($products->ID); ?>" title="<?php echo $products->post_title; ?>" target="_blank">
                        <img class="wp-quick-img-thumbnail" src="<?php echo $featured_image[0]; ?>" data-id="<?php echo $products->ID; ?>" alt="<?php echo $products->post_title; ?>" />
                        </a>
                        <?php } ?>

                    </td>

                    <td data-title="Title" class="qs-title" colspan="3">
                      
                      <?php if(!$product->has_child()): ?>
                      <a href="<?php echo get_the_permalink($products->ID); ?>" title="<?php echo $products->post_title; ?>" target="_blank">
                      <?php endif; ?>
					  <?php echo $products->post_title.($product->has_child() ? ' '.__('(Options)', 'wp-quick') : ''); ?>
                      <?php if(!$product->has_child()): ?>
                      </a>
                      <?php endif; ?>
                    </td>

                    <td data-title="Price" class="qs-price"><?php echo get_woocommerce_currency_symbol().$price; ?></td>

                    <?php

                        $quantity_name = ($product->has_child() ? "var[{$products->ID}][quantity]" : "prod[{$products->ID}]");

                    ?>

                    <td data-title="Qty" class="qs-qty"><input size="2" pid="<?php echo $products->ID; ?>" name="<?php echo $quantity_name; ?>" value="<?php echo $minimum_order_quantity; ?>" type="text" class="qty-box" /></td>

                    <td data-title="Stock" class="qs-stock"><?php echo $stock; ?></td>
                  <?php if($is_custom_field && $wpqs_pro){ ?>

                    <td data-title="<?php echo $wpqs_custom_field['label'] ?>">

                        

                         <?php echo wpqs_custom_field_html($products->ID)['field']; ?>



                    </td>

                   <?php }?>

                    <td data-title="Buy" style="text-align:center;" class="qs-buy">
                        <a  rel="nofollow" data-quantity="<?php echo $minimum_order_quantity; ?>" data-quantity-min="<?php echo $minimum_order_quantity; ?>" data-quantity-max="<?php echo $maximum_order_quantity; ?>" href="<?php echo $shop_page_url; ?>/?add-to-cart=<?php echo $products->ID; ?>" data-product_id="<?php echo $products->ID; ?>" data-product_sku="<?php echo $product->get_sku(); ?>" class="<?php echo ($product->has_child() ? 'disabled' : '') ?> button btn btn-sm small btn-primary px-3 pt-0 pb-1 product_type_simple add_to_cart_button ajax_add_to_cart"><span><?php _e('Buy', 'wp-quick'); ?></span></a>
                    </td>

                  <?php

                      if($product->has_child()){

                          echo '<input type="hidden" name="var['.$products->ID.'][variation_id]" class="variation_id" value="0">';
                          echo '<input type="hidden" name="var['.$products->ID.'][product_id]" class="product_id" value="'.$products->ID.'">';


                      }

                  ?>

              </tr>

    <?php

            if($product->has_child()){



                $get_attributes = $product->get_attributes( 'edit' );


                $attributes = array();


                foreach ( $get_attributes as $attribute ) {


                  if ( $attribute->is_taxonomy() ) {

                        $terms = $attribute->get_terms();
                        if(!empty($terms)){
                            foreach ($terms as $term){

                                $attributes[$attribute->get_name()][] = $term->slug;
                            }
                        }


                    }else{

                        $attributes[$attribute->get_name()] = $attribute->get_options();
                    }

                }



                $attribute_keys  = array_keys( $attributes );
                $variations_json = wp_json_encode( $product->get_available_variations() );
                $variations_attr = function_exists( 'wc_esc_json' ) ? wc_esc_json( $variations_json ) : _wp_specialchars( $variations_json, ENT_QUOTES, 'UTF-8', true );



                ?>


                    <tr id="var-product-<?php echo $products->ID; ?>" data-variation="<?php echo $variations_attr;  ?>" class="var_row_<?php echo $products->ID; ?> qs_var_product" data-product="<?php echo $products->ID; ?>" style="display: none">

                        <td colspan="<?php echo $is_custom_field ? 10 : 9; ?>">
                            <table class="variations" cellspacing="0">
                                <tbody>
                                <?php foreach ( $attributes as $attribute_name => $options ) :


                                    ?>
                                    <tr>
                                        <td class="label"><label for="<?php echo esc_attr( sanitize_title( $attribute_name ) ); ?>"><?php echo wc_attribute_label( $attribute_name ); // WPCS: XSS ok. ?></label></td>
                                        <td class="value">
                                            <?php
                                            wc_dropdown_variation_attribute_options(
                                                array(
                                                    'options'   => $options,
                                                    'attribute' => $attribute_name,
                                                    'product'   => $product,
                                                    'class' => 'qs_variation_select',
                                                    'name' => "var[{$products->ID}][variations][attribute_".strtolower($attribute_name)."]",
                                                )
                                            );


//                                            echo end( $attribute_keys ) === $attribute_name ? wp_kses_post( apply_filters( 'woocommerce_reset_variations_link', '<a class="reset_variations" href="#">' . esc_html__( 'Clear', 'woocommerce' ) . '</a>' ) ) : '';
                                            ?>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                                </tbody>
                            </table>
                        </td>

                    </tr>


                <?php



            }


        }
    ?>
                </tbody>

          </table>
         </div>
        </div>

        <div class="qs-success"></div>

            <div class="buttons">
          <div style="text-align:right">
              <input type="submit" id="button-quickshop-cart-<?php echo date('Y'); ?>" class="button btn btn-sm small btn-primary add_to_cart_button" value="<?php echo __('Add to Cart', 'wp-quick'); ?>" />
              <a class="btn btn-primary text-white small bootstrap_add_to_cart" style="display: none"><?php echo __('Add to Cart', 'wp-quick'); ?></a>
          </div>
        </div>
          </div>
    </div>
    </form>
    <?php
    }
    ?>


