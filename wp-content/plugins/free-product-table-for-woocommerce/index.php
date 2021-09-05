<?php
/**
* Plugin Name: Woo Table Pro - Products Table For WooCommerce
* Plugin URI:  https://binarycarpenter.com/product-table-plugin-for-woocommerce/
* Description: The advanced product table plugin for WooCommerce. Sort, filter, select the products you want to show on your tables.
* Version: 1.78
* Author: WooCommerce & WordPress Tutorials
* Author URI: https://www.binarycarpenter.com
* License: GPL2
* WC tested up to: 3.7.0
*/

namespace BinaryCarpenter\PFW;
//include_once 'vendor/autoload.php';

include_once 'inc/actions.php';
include_once 'inc/helpers.php';
include_once 'inc/config.php';
include_once 'inc/Core.php';
include_once 'inc/shortcodes.php';
include_once 'inc/PFW_Table.php';
include_once 'inc/PFW_Product.php';
include_once 'inc/PFW_Filter.php';

use \BinaryCarpenter\PFW\Config as Config;
use \BinaryCarpenter\PFW\PFW_Table;
use \BinaryCarpenter\PFW\Core as Core;

class Initiator
{

    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_menu'));
        add_action('admin_enqueue_scripts', array($this, 'load_backend_scripts'), 1000);
        add_action('wp_enqueue_scripts', array($this, 'load_frontend_scripts'), 1000);
        add_filter('woocommerce_dropdown_variation_attribute_options_html', array($this, 'change_choose_an_option'), 10, 2);


        add_action('wp_ajax_pfw_save_table', array($this, 'save_table_cb'));
        add_action('wp_ajax_pfw_get_tables', array($this, 'get_tables_cb'));
        add_action('wp_ajax_pfw_edit_table', array($this, 'edit_table_cb'));
        add_action('wp_ajax_pfw_delete_table', array($this, 'delete_table_cb'));

        add_action('wp_ajax_pfw_get_product_variation_id', array($this, 'get_variation_id'));
        add_action('wp_ajax_nopriv_pfw_get_product_variation_id', array($this, 'get_variation_id'));
        add_action('wp_head', array($this, 'myplugin_ajaxurl'));



        add_action('wp_ajax_pfw_add_items_from_cart', array($this, 'ajax_add_multiple_items_to_cart'));
        add_action('wp_ajax_nopriv_pfw_add_items_from_cart', array($this, 'ajax_add_multiple_items_to_cart'));


        add_action('init', array($this, 'register_content_type'));

        add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'action_links' ) );
    }

    public function register_content_type()
    {
        $args = array(
            'labels' => array(
                'name' => 'Tables',
                'singular_name' => 'Table',
                'add_new' => 'Add new table',
                'edit_item' => 'Edit Premium Content',
                'all_items' => 'All Premium Content',
                'publicly_queryable' => true
            ),
            'public' => false,
            'show_ui' => false,
            'has_archive' => true,
            'supports' => array( 'title', 'author')

        );

        register_post_type(Config::PFW_TABLE_POST_TYPE, $args);
    }

    public function action_links($links)
    {
        $custom_links = array();
        $custom_links[] = '<a href="' . admin_url( 'admin.php?page=pfw_slug-pfw_tables' ) . '">' . __( 'Get started', Config::PLUGIN_TEXT_DOMAIN ) . '</a>';
        $custom_links[] = '<a target="_blank" href="https://tickets.binarycarpenter.com/open.php">' . __( 'Supports', Config::PLUGIN_TEXT_DOMAIN ) . '</a>';
        if (!Config::PFW_IS_PRO)
            $custom_links[] = '<a target="_blank" href="https://www.binarycarpenter.com/app/woocommerce-product-table-plugin-drag-and-drop-table-builder/">' . __( 'Get PRO', Config::PLUGIN_TEXT_DOMAIN ) . '</a>';
        return array_merge( $custom_links, $links );
    }
    function ajax_add_multiple_items_to_cart() {

        foreach ($_POST['products'] as $product) {


            try{
                WC()->cart->add_to_cart( intval($product["product_id"]), intval($product["quantity"]));


            } catch (\Exception $ex)
            {
                echo $ex->getMessage();
            }

        }

        // Fragments and mini cart are returned
        $data = array(
            'fragments' => apply_filters( 'woocommerce_add_to_cart_fragments', array()
            ),
            'cart_hash' => apply_filters( 'woocommerce_add_to_cart_hash', WC()->cart->get_cart_for_session() ? md5( json_encode( WC()->cart->get_cart_for_session() ) ) : '', WC()->cart->get_cart_for_session() )
        );

        wp_send_json( $data );

        die();
    }



    function myplugin_ajaxurl() {

        echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
         </script>';
    }

    function get_variation_id()
    {

        $content = file_get_contents("php://input");
        parse_str($content, $data);


        $product_id = $data['product_id'];
        $attributes = $data['attributes'];


        $product = new \WC_Product_Variable($product_id);



        $selected_product = null;

        foreach ($product->get_available_variations() as $variation)
        {
            $variation_attributes = $variation['attributes'];

            if (count(array_diff($attributes, $variation_attributes)) == 0)
            {
                $selected_product = $variation;
                break;
            }
        }

        echo json_encode($selected_product);
        die();


    }


    function save_table_cb()
    {
        $content = file_get_contents("php://input");
        parse_str($content, $data);

        $table = new PFW_Table($data['id']);

        $table->setCategories($data['categories']);
        $table->setName($data['name']);
        $table->setFields($data['fields']);
        $table->setFieldsHTML($data['fieldHTML']);
        $table->setOptions($data['options']);

        echo $table->save();

        die();
    }



    function get_tables_cb()
    {
        $tables = PFW_Table::listTables();
        $data = array();
        foreach ($tables as $t)
        {
            $data[]  = array(
                'title' => $t->post_title,
                'ID' => $t->ID
            );
        }

        echo json_encode($data);

        die();

    }




    function edit_table_cb()
    {
        parse_str(file_get_contents("php://input") , $data);
        $table = new PFW_Table($data['id']);
        echo $table->getJSON();

        die();
    }



    function delete_table_cb()
    {
        parse_str(file_get_contents("php://input"), $data);

        wp_delete_post($data['id']);
        die();
    }




    function add_menu() {

        Core::admin_menu();

        add_submenu_page(Core::MENU_SLUG, "Woo Table Pro", "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAuaSURBVHic7ZprjBxXmYafU1V9nememZ6bxzNjj2/YQxI7No4NOIEsYQPe9TokWBZZ48Wr3R8gJH4QoYCQECCtlotAXCRIuO0F7QJOlGUJrHASNhsTMFmSOHY8MbbJxG5f5uq59PStqqvq8KOqunvs6pr2GNNJ8CuVuqu+93zvV6dOnfOdc0pIKflzhtLoABqN6xXQ6AAajesV0OgAGo3rFdDoABoNzfuze/fu8FSBnSBvAZaBFFIK4dkVBQEgJe41xyaFLHPEJTakYxPCLUvFH7jlXJtwtSQVf54N1yZcWyUGQMwvJ3BtokpLSoEQEtseFij/n4vz/V/v319wdKXkXTvuudES6n8A6+usuNc2BCeEkPc+/t8PHxbbt+9JljTjmJSyPxmT/NVGnQ3LTbzqrJRxf71njJxv8OXMN1RRr4hTswwghKyD4/yOTCv85LkIz78SQghxNmSGb9QMTf8Ukv4b+ky++P4sYe31mxqv6rbYtq7EZx5q5ukToX5D1T+uIcVfgOTuLbpz882D0LbNKVE4A5OP+3sLtULXDlCiYOVh/FEw5/y5S+6GSA8g4eJTkH3Jn5e82dEWKhRegbFH/XnhTljyXlBd7ZEfQWnWhyig7+8g0g3ShsnHEZkjfODtBZ4+EQK4TUPImyKq5NZ1hlNm2QchcYPzX1owdRBs/XLf7bdD377KuTHhX1mhFlj+4cp5tA9OfNL/xvr+vkrbhInH/LXbtkHPrsp5fhgmn7icF+6A3r2Vcy0JmSMs77S8K4MakpCmguYNiMNfdJ4EQDHtHwDAxAEwc24LyMH00/680iy89FGI9jhPIXPYnwfw8j9D4ian4gO1fwbGWKX1zT7nzzMm4NiHINwFSJh7EQCl3FmhaZcVKp5zjoVgFWq/Hpdi7qhzLAR91DkWgl2C6UP1aedOOUcNXE+EACypmHp07SGkkAghEMjqJAgEJRRxEEKDoaIhK7mGtF1GdW7yohmLr9KMYkzYnhnbq2uBRCIQyDEZDpWkEL1KyfAGLgmgCGwbFAVsoIQQx41I/KawkaNKT7hxSiGkRAqBkENmuGmVZhXC2FK4Y3UlNicGWwE4cbtXAVKoMW1s6ZdvC6qpz088yzemjrB3wy30JFpq8sZzc/zr4WfYvHQZ71j5hiCXfPe5QxStEh/e8rZA3q/Sw/xqbJi/Xb+ZvmRrTd5kPsv3nv9NXdrgdMSacCpdBJNh3MoDkDWMQF7OtWeNGh1YFbIlHd00K+eGzrnMDFJCWyzGkuak69PxNacH+/Ts9Wh7d6xJkPDqSH5+dnKIMzNTgJPKf2Tr24n49NN/TGgIbEC9pip14s19A7RF44AkFWu6xjcvAImGRHorwwXb5Kg+id9K8YRZAJz3LCiw8VwWgHzJID07HRiC7ep4PCEE6zq7y3bvuvfaXcxnSc+GF60tgCWJJCGl8rzFHTt2FSORSOirD37n+D+kH+s/mDuXDIz6NY5Vre3T/3jjlpNP7Lx/C8iMBlASUvl2e/qGTtHBmjEDvz5hLDtHRi+yJdFNTzheU2C8VOBQZpTecBObE12BwfzP1BlK0uau9hWBvCO5SU4X59jc3EVvpGnR2gqCfd3r2nYysPV/hcC2pZjXllelOliV6vAP9uQQx8ZH+ETfJt4TEPDPp9NsH/optyZ7+OG6OwNvrPU332HWNPjx4PbytUJRR0oIhzU01WmqH/z9Uzw4OsR9vRt4X+eaK9IulUz0kjO9j8ci5XUS91dc2y72CvHSqTSTU86sTlUV3rxxEFVdfLJqmhbPvPA7bNtp0R2pFt64Zlk15dVVAW0tzRhGCQnEo5GrunlwKrGrvZWCbiCAjlSle/PWTZwKqOr1Ldv2zQq8kaEkbYq25cNwYLjJsYUM5DlOnR+P19bRQltHJcv0rltXob1soKdsVy5dYgJF3LFjV1GJhCIbH/40B35/nCOj54ODfo3jY30b+cLAW3j33fdimmbRbQGOsTkcoSkc9k0MdcvEtG1atQgRUTtvMqTFtKkTVVRa1EhgMOOlAhJJd6j2qAKQsQwKtkmLGiGqLF5bEdAzX2t+H7Bt2Uq2LVvp69wbBf5lzTvqGgXuSq2oexQY3bovkOeNAg+sfltdo0A92peMAtduLiCl5MjxYfJ5Z4KytLudgf7uBUr96XDNRwEpoVSyMC2nU/J+Gw0hAOG2gGv5kYiiCG7ZsNDcvHEQd+zYVRQhLbLpkc/w7Pk0x8ZHfIkZvUjRLDEQTQR2bnOWwXAxQ6sWYXkkESh+LH8RS0o2NPlnnx7O6VkumkWWRxK0aovXVoXg/r6N7O5YzV+/dw+6YZgaIL0mcDYzzXiuxtq+i9PFOSCYAzBj6syYdSxM4OT69eCMPscZ/eq0fzs3zu6O1d7p/FHg7sENZPSi73T4yVdOcfLiOA+uvp07W/trij81e4F9p37BjtQAX18ZuMrG+sM/ZM4q8crmvYG8T555hv+cOMnXVt7G36QGFq2tCkF/pNk5cZMitwVUSMlI1Nd52J2YdIViDEQTFHWD4fQolmWjqoIV/UuIRSP8rhADoEnRGIgGvwJeZrYQL6GGAOgMRRmIJsgXdIbTI5iWhaoorFreQzwWvSJtF4ufC2Sy+fLEBaCtJUEsGpz4/LGQzRWYmqm8Crl8kXjM/8HVgjcpdFrAIvKArvZWmuNRTMtGVRSa4lcWwNWgq6OVRHMcW9poqkokHFq0r3kt4NTFcU5NTfqOi+cyMwB87cJRfnxxuKbD8+7S/TPZMfad/EWgeMFyVoQX4h2aGwPgmyND/Hw6vWjtkKLyoSU3sKm5s/xdxrw+4NDZ04xmM4HBPDlb32TpdHGO08UTdXH/bbw+3sHMBQ4Gh7egdlSobGruLJ+7r4CDe964gZE5f4XnLqRJz07z8b5NbE3UTmUPZyf47NlnuTXZw329NwcGuufE4+Rtk/+qWhHywwOjxzgwfZb7em/m1mRPTd5C2iGhcHvLUqDyBY2bCTp10ByOsKa987KC4LweAFsT3bynfQWWZTMyPoVlWaiqQndnipCmlmdrveGmwEkTQMjd+/J4c7kCk1OzSCmJRsIs7W4HKDf7zc2dgT6vRNvDvBZwJZiczjCcrmSNQij0LmlfjKsyzpwbm9e7d6ZaCIWu0XTF2xlabPnOVBIp+7AsC0Vxlp6uFqsHljI9m0UIQSwavnY3X4V5w+BkPsu5zCx+jWKq4OwNHphOM1rKzzfawITTGobyztbWy8VZHhgdChQ33M1jX17OPYCXCo7PJ2bPMWPV3ptcSDssFHamVtARilZWh+/YsWsWSL7p0X/iu88f4mI+d1nB1xM+2ruBL63Yxl3v+wC5XB7N3a8H4J0r13JmZsq3UxiemmQin+We9pWsidXeHh8uZnho8mUG423sDMjbAb5y4Si6bXF/38ZA3oHps7yQm2RnaoDBeNuitcNCZV/3unnXNCRONiIly1tTLG9N+TrPGToT+Sx7u9YuuCT20OTLrI+387mBtwTe2AOjQ+i2tSBvxjR4ITfJvZ1rFlwSq1fbNC0QlBTgOIA+FryR+XrC+ZFRdF0HKV5UgF8CnP/3x5Als2ahVLwJRQi5Khq8d7oymkQTCmvjC48Ka2OtvCFWH08VgrWx2s0fYE2shdAC2rZt863vfd85EfJJsX37nqShGceQsj+yJMXS97+TaL//puadheTRwVjreqgkT+Vpg5TlziRjmySEVrWuUOFWXythY9kQEUqVv0oPVH0tJy3i3nK8lBXbJdycbdIkVN9lvrGJCQ488X8cP3Gy/KmskFLyl3ft2iil+AGStTWr7vWFo6q09hz46SPHhFdzb929O9aUZ68UcivgbA5Uf4nsEr2kQSAue2RVX2U510T5MVU4rk1eZhNVHFfLs5XjcK+LKn9yvs2LoXqHTwgpXf9pEL9NxfjJ/v37DTfEV8f3QY3Cn/2HktcroNEBNBrXK6DRATQa1yug0QE0Gn8AZOs2XzT95BYAAAAASUVORK5CYII=' style='width: 14px; height: 14px;'> Woo Table Pro", "manage_options", Config::PFW_SLUG. "-pfw_tables", array($this, "manage_tables"));
    }

    function main_ui()
    {
        include_once 'ui/main-ui.php';
    }

    function manage_tables()
    {
        include_once "ui/manage-tables.php";
    }




    function load_backend_scripts()
    {
        wp_register_style(Config::PFW_PREFIX . '-backend-bundle-style', plugins_url( 'bundle/css/backend.css', __FILE__ ));
        wp_register_style(Config::PFW_PREFIX . '-backend-select-2-style', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css');
        wp_register_style(Config::PFW_PREFIX . '-backend-fa', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
        wp_register_script(Config::PFW_PREFIX . '-backend-select-2-script', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js');

        wp_register_script( Config::PFW_PREFIX . '-backend-bundle-handler', plugins_url( 'bundle/js/backend-bundle.min.js', __FILE__ ), array(
            'jquery',
            'jquery-ui-core',
            'jquery-effects-core',
            'jquery-ui-widget',
            'jquery-ui-draggable',
            'jquery-ui-droppable',
            'jquery-ui-sortable',
            'jquery-ui-tabs',
            'underscore',
            'backbone'
        ), false, true );

        if (stripos(get_current_screen()->base, "pfw_slug") !== false)
        {
            wp_enqueue_script(Config::PFW_PREFIX . '-backend-select-2-script');
            wp_enqueue_script(Config::PFW_PREFIX . '-backend-bundle-handler', '', array(), false, true);
            wp_enqueue_style(Config::PFW_PREFIX . '-backend-fa');
            wp_enqueue_style(Config::PFW_PREFIX . '-backend-select-2-style');
            wp_enqueue_style(Config::PFW_PREFIX . '-backend-bundle-style');
        }


    }






    function load_frontend_scripts()
    {
        wp_register_style(Config::PFW_PREFIX . '-frontend-bundle-style', plugins_url( 'bundle/css/front.css', __FILE__ ));
        wp_register_script(Config::PFW_PREFIX . '-frontend-jspdf', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js');
        wp_register_script(Config::PFW_PREFIX . '-frontend-autotable', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.2/jspdf.plugin.autotable.js');
        wp_enqueue_style(Config::PFW_PREFIX . '-frontend-bundle-style');


        wp_register_script( Config::PFW_PREFIX . '-frontend-bundle-handler', plugins_url( 'bundle/js/frontend-bundle.min.js', __FILE__ ), array(
            'jquery',
            'jquery-ui-core',
            'jquery-ui-widget',
            'underscore',
            'backbone',
            Config::PFW_PREFIX . '-frontend-jspdf',
            Config::PFW_PREFIX . '-frontend-autotable'
        ), false, false );

        wp_enqueue_script(Config::PFW_PREFIX . '-frontend-bundle-handler', '', array(), false, false);

    }


    function change_choose_an_option($html, $args){
        $html = str_replace('Choose an option', 'Select', $html);
        return $html;
    }


}


new \BinaryCarpenter\PFW\Initiator();


