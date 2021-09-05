<?php

namespace BinaryCarpenter\PFW;
use \BinaryCarpenter\PFW\PFW_Table;
use \BinaryCarpenter\PFW\PFW_Filter;

class Shortcode
{

    public function __construct()
    {
        
        add_shortcode('pfw_show_table', array($this, 'pfw_datatable_shortcode'));

    }

    public function getFieldValue($field, $property, $default)
    {
        if (!is_object($field))
            return $default;

        if (isset($field->$property))
            return $field->$property;

        return $default;
    }
    public function pfw_datatable_shortcode($atts)
    {
        $tableID = $atts['id'];

        $table = new PFW_Table($tableID);

        $products = ($table->getAllProductsRows());

        //if there isn't a product to display, return
        if (count($products) == 0)
            return;

        $filterString = '';
        if (isset($table->getOptions()->filterOptions))
        {
            $filterOptions = $table->getOptions()->filterOptions;

            $filterString = '<span>Filters: ';

            foreach ($filterOptions as $filterOption)
            {

                if ($filterOption->field == 'rating')
                    $filterString .= PFW_Filter::rating($filterOption->label);
                else if ($filterOption->field == 'price')
                    $filterString .= PFW_Filter::price($filterOption->label);
                else if ($filterOption->field == 'categories')
                    $filterString .= PFW_Filter::categories($table->getCategories(), $filterOption->label);
            }

            $filterString .='</span>';
        }

        $filterString = rawurlencode(str_replace("\n", " ",$filterString));


        $randomTableID = "pfw-table-" . rand(1000, 80000);



        $tableColumns = array();
        $columnDefs = array();
        $hasCheckbox = "false"; //if there is checkbox, we will print the add selected product to cart button

        //if the table fields are not valid, return blank (problably a deleted table)
        if (!is_array($table->getFields()))
            return;
        for ($i = 0; $i < count($table->getFields()); $i++)
        {

            $orderable = true;
            $singleColumnDef = array();
            $singleTableColumn = array();

            if ($table->getFields()[$i]->field == 'checkbox')
                $hasCheckbox = "true";

            $sortable = $this->getFieldValue($table->getFields()[$i], "sortable", "false");
            $field = $this->getFieldValue($table->getFields()[$i], "field", "false");
            $display_title = $this->getFieldValue($table->getFields()[$i], "display_title", "false");
            $column_width = $this->getFieldValue($table->getFields()[$i], "column_width", "");
            $column_priority = $this->getFieldValue($table->getFields()[$i], "column_priority", 1);
            //make the image and add to cart field not sort table
            if ($field == 'image' || $field == 'add-to-cart' || ($sortable == "false") )
            {
                $orderable = false;
            }

            if ($table->getFields()[$i]->field == 'price')
            {
                $singleColumnDef = array(
                    'orderable' => $orderable,
                    'responsivePriority' => $column_priority,
                    'targets' => $i,
                    'type' => 'num',
                    'className' => 'pfw-cell-'.$field
                );
                           

                $singleTableColumn = array(
                    'title' => $display_title, 

                    'data' => 'price',
                    'render' => array(
                        "_" => "display",
                        "sort" => "value",
                    )
                );


            } else
            {
                $singleColumnDef = array(
                    'orderable' => $orderable,
                    'responsivePriority' => $column_priority,  
                    'targets' => $i,
                    'className' => 'pfw-cell-'. $field
                );
                $singleTableColumn = array(
                    'title' => $display_title,
                    'data' => $field,
                );
            }

            //if the user has specified a width for the column, add it so
             if ( trim($column_width) !='')
             {
                $singleColumnDef['width'] = trim($column_width); 
             }
            $columnDefs[] = $singleColumnDef;
            $tableColumns[] = $singleTableColumn;

        }

        //add the meta data columns to the table, will be used for filtering but they all be hidden
        $tableColumns[] = array(
            'title' => 'raw_price',
            'data' => 'raw_price',
            'visible' => false,
    //        'searchable' => false
        );
        $tableColumns[] = array(
            'title' => 'raw_price_max',
            'data' => 'raw_price_max',
            'visible' => false,
    //        'searchable' => false
        );
        $tableColumns[] = array(
            'title' => 'raw_rating',
            'data' => 'raw_rating',
            'visible' => false,
    //        'searchable' => false
        );
        $tableColumns[] = array(
            'title' => 'raw_categories',
            'data' => 'raw_categories',
            'visible' => false,
    //        'searchable' => false
        );

        //add the raw fields for filtering


        $data = array();
        foreach ($products as $product)
        {
            $single_row = array();
            foreach ($product as $key => $value)
            {
                if ($key == 'price')
                {
                    $single_row['price'] = array(
                        'display' => $product['price'],
                        'value' => intval($product['raw_price']),

                    );
                } else
                {
                    $single_row[$key] = $value;
                }

            }
            $data[] = $single_row;
        }
    //

        $data = json_encode($data);

        $columns = json_encode($tableColumns);
        $html = '<div class="pfw-product-table '.$table->getTableStyleClass().'"><table id="'.$randomTableID.'" class="display" width="100%"></table></div>';
        $frontScript = file_get_contents(plugin_dir_path(__FILE__) . 'js_functions.html');

        $columnDefs = json_encode($columnDefs);

        $html .= '<script>(function($){  $(document).ready(function(){ pfw_init_table("#'.$randomTableID.'", '.$data.', '.$columns.', '.$columnDefs.', \''.$filterString.'\', '.$hasCheckbox.')   }); })(jQuery)</script>';

        $html.= $frontScript;

        echo $html;

    }

}
 new Shortcode();
