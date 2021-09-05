<?php
/**
 * Created by PhpStorm.
 * User: myn
 * Date: 1/3/19
 * Time: 2:05 PM
 */

 /**
    this class generate fields of a product 

 */
namespace BinaryCarpenter\PFW;
require_once( ABSPATH . 'wp-admin/includes/template.php' );
class PFW_Product
{

    private $product, $productType;
    private $fields;//this is the data of all fields in the table. We use this to get the styling data to render the frontend, for example the image width
    /**
     * PFW_Product constructor.
     * @param $id: product id
     */
    function __construct($id, $fields)
    {
        $this->product = new \WC_Product($id);
        $terms = get_the_terms($this->product->get_id(), 'product_type');
        $this->productType = (!empty($terms)) ? sanitize_title(current($terms)->name) : 'simple';
        $this->fields = $fields;

        if ($this->productType == 'variable')
        {
            $this->product = new \WC_Product_Variable($id);
        }
    }


    //generate html for a single row
    public function generateRowHTML()
    {

    }

    public function generateJSON()
    {
        return json_encode($this->getRow());
    }

    public function getRow()
    {

        $row = array();
        $fields = $this->fields;

        foreach ($fields as $f)
        {
            $row[$f->field] = $this->getField($f->field, $f);

        }
//        //get the raw price field
        $row['raw_price'] = $this->getField('raw_price');
        $row['raw_price_max'] = $this->getField('raw_price_max');
        $row['raw_rating'] = $this->getField('raw_rating');
        $row['raw_categories'] = $this->getField('raw_categories');

        return $row;
    }
    /**
        This function generate HTML for fields. 
        $field_name is a string that tells the function what to render. 
        $field_data is the custom data that user set when creating the table (for example, width of the column, name of the field...)
        some fields (hidden ones) doesn't need a $field_data so the default will be null
        other than that, every visible fields may need $field_data to render properly

    */
    public function getField($field_name, $field_data=null)
    {
        switch($field_name)
        {
            case 'name':
                return "<a class='pfw-product-name-url' target='_blank' href='".get_permalink($this->product->get_id())."'>".$this->product->get_name() . "</a>";
                break;

            case 'image':
                return "<a style='display: block; z-index: initial;' class='pfw-lightcase' href='". wp_get_attachment_image_src($this->product->get_image_id(), 'full', false)[0] . "'><img style='z-index: -1;' class='pfw-product-image' src='". wp_get_attachment_image_src($this->product->get_image_id(), 'thumbnail', false)[0] . "'></a>";
                break;

            case 'price':
                return "<span class='pfw-product-price' data-order='".$this->product->get_price()."'>".$this->product->get_price_html() . "</span>";
                break;

                //this is a hidden field, will be used to filter the price
            case 'raw_price':
                return $this->product->get_price();
                break;
            case 'sku':
                return "<a class='pfw-product-sku' target='_blank' href='".get_permalink($this->product->get_id())."'>".$this->product->get_sku() . "</a>";
                break;
            case 'raw_price_max':

                if ($this->productType == 'variable')
                {
                    return $this->product->get_variation_price('max');
                }

                return $this->product->get_price();

                break;


            case 'tax-status':
                return $this->product->get_tax_status();
                break;

            case 'tax-class':
                return $this->product->get_tax_class();
                break;

            case 'stock':
                return $this->product->get_stock_quantity();
                break;

            case 'weight':
                return $this->product->get_weight();
                break;
            case 'width':
                return $this->product->get_width();
                break;
            case 'product_length':
                return $this->product->get_length();
                break;
            case 'height':
                return $this->product->get_height();
                break;
            case 'dimensions':
                return wc_format_dimensions($this->product->get_dimensions(false)) ;
                break;
            case 'categories':

                $termString = array();

                foreach ($this->product->get_category_ids() as $cat)
                {
                    $term = get_term($cat);
                    $termString[] =  "<a href='".get_term_link($cat)."'>".$term->name . "</a>";
                }

                return implode(", ", $termString);
                break;

            case 'checkbox':

                return '<input '.( $this->productType == 'grouped' || $this->productType == 'external' ? 'disabled' : '' ).' class="pfw-product-checkbox" type="checkbox" />';
                break;
            case 'raw_categories':
                //return a list of comma delimited categories of the product, use for filter purpose
                $termString = array();

                foreach ($this->product->get_category_ids() as $cat)
                {
                    $term = get_term($cat);
                    $termString[]= $term->name;
                }

                return implode(",", $termString);
                break;
            case 'tags':
                $termString = '';

                foreach ($this->product->get_tag_ids() as $cat)
                {
                    $term = get_term($cat);
                    $termString .= "<a href='".get_term_link($cat)."'>".$term->name . ", </a>";
                }

                return $termString;
                break;
            case 'review':
                return $this->product->get_average_rating();
                break;

            case 'rating':
                if ($this->product->get_rating_count() > 0)
                    return "<div style='display: flex;'>".wc_get_rating_html($this->product->get_average_rating(), $this->product->get_rating_count()) . '<span>('.$this->product->get_rating_count().')</span></div>';
                return "";
                break;
            case 'raw_rating':
                return $this->product->get_average_rating();
                break;
            case 'description':
                return $this->product->get_description();
                break;
            case 'short-description':
                return $this->product->get_short_description();
                break;
            case 'sale-price':
                return get_woocommerce_currency_symbol() . $this->product->get_sale_price();
                break;
            case 'total-sales':
                return $this->product->get_total_sales();
                break;

            case 'add-to-cart':

                $variationSelect = '';
                if ($this->productType == 'variable')
                {
                    $attributes  = $this->product->get_variation_attributes();
                    $available_variations = $this->product->get_available_variations();

                    foreach ($attributes as $key => $value)
                    {
                        $attributeName = wc_attribute_label($key, $this->product);

                        $variationSelect .= '<select name="attribute_'.strtolower($key).'">';
                        $variationSelect .= "<option value=''>$attributeName</option>";


                        foreach ($value as $v)
                        {
                            $valueTerm = (get_term_by('slug', $v, $key ));
                            if (!is_object($valueTerm))
                            {
                                $variationSelect.= '<option value="'.$v.'">'.$v.'</option>';
                            } else
                            {
                                $variationSelect.= '<option value="'.$v.'">'.$valueTerm->name.'</option>';
                            }

                        }

                        $variationSelect = "$variationSelect </select>";
                    }

                    $variations_json = wp_json_encode( $available_variations );
                    $variations_attr = function_exists( 'wc_esc_json' ) ? wc_esc_json( $variations_json ) : _wp_specialchars( $variations_json, ENT_QUOTES, 'UTF-8', true );

                    $variationSelect = sprintf('<div class="pfw-variations" data-variations="%2$s">%1$s</div><span  class="pfw-clear-variation-select">Clear</span>', $variationSelect, $variations_attr );

                }
                include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

                $default_text = ($this->product->add_to_cart_text());
                switch($this->productType)
                {
                    case 'simple':
                        $atc_text = isset($field_data->simple_product_text) && $field_data->simple_product_text != '' ? $field_data->simple_product_text : $default_text;
                        break;

                    case 'variable':
                        $atc_text = isset($field_data->variable_product_text) && $field_data->variable_product_text != '' ? $field_data->variable_product_text : $default_text;
                        break;

                    case 'grouped':
                        $atc_text = isset($field_data->grouped_product_text) && $field_data->grouped_product_text != '' ? $field_data->grouped_product_text : $default_text;
                        break;

                    case 'external':
                        $atc_text = isset($field_data->external_product_text) && $field_data->external_product_text != '' ? $field_data->external_product_text : $default_text;
                        break;

                    default:
                        $atc_text = isset($field_data->simple_product_text) && $field_data->simple_product_text != '' ? $field_data->simple_product_text : $default_text;
                        break;
                 }

                if ($this->productType == 'grouped' || $this->productType == 'external')
                    return sprintf('<div data-parent-product-id="%1$s" data-type="%2$s" class="pfw-add-to-cart-group">%3$s <div class="pfw-button-and-input"><input disabled class="pfw-order-quantity input-text qty text" type="number" value="1"><a href="%5$s" target="_blank" class="pfw-add-to-cart-button button add_to_cart_button">%4$s</a> </div></div>', $this->product->get_id(), $this->productType, $variationSelect, $atc_text, $this->product->get_permalink());
                return sprintf('<div data-parent-product-id="%1$s" data-type="%2$s" class="pfw-add-to-cart-group">%3$s <div class="pfw-button-and-input"><input class="pfw-order-quantity input-text qty text" type="number" value="1"><button class="pfw-add-to-cart-button button add_to_cart_button">%4$s</button> </div></div>', $this->product->get_id(), $this->productType, $variationSelect, $atc_text);

                break;
            default:
                return $this->product->get_name();
                break;
        }
    }
}
