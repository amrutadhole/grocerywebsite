<?php
/**
 * Created by PhpStorm.
 * User: myn
 * Date: 1/2/19
 * Time: 4:06 PM
 */
namespace BinaryCarpenter\PFW;
use BinaryCarpenter\PFW\PFW_Filter;
use BinaryCarpenter\PFW\PFW_Product;
class PFW_Table
{
    const PFW_TABLE_POST_TYPE = "pfw_table";

    const PFW_META_OPTIONS = "pfw_table_options";
    const PFW_META_CATEGORIES = "pfw_table_categories";
    const PFW_META_FIELDS = "pfw_table_fields";//fields data will be stored in a meta key, not post content
    const PFW_META_SORTING = "pfw_table_sorting";//
    private $wpdb;
    private $name,  $options;//option is a JSON string
    private $categories;//array of categories
    private $fields; //array of fields with order
    private $sorting; //object defines the sorting of products
    private $fieldsHTML;//html string of fields
    private $id; //post id, default = 0;


    //products are list of products to display


    function __construct($id)
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->id = $id;

        if ($id != 0)
            $this->getTableData();
    }

    /**
     * @return mixed
     */
    public function getSorting()
    {
        return $this->sorting;
    }

    /**
     * @param mixed $sorting
     */
    public function setSorting($sorting)
    {
        $this->sorting = $sorting;
    }




    public function getTableData()
    {
        //get data for every fields of table
        if ($this->id == 0)
            return null;
        $data = get_post($this->id);

        if ($data == null)
            return null;

        $this->name = $data->post_title;
        $this->fieldsHTML = $data->post_content;
        $this->fields = json_decode(get_post_meta($this->id, self::PFW_META_FIELDS, true));

        $user_selected_categories = json_decode(get_post_meta($this->id, self::PFW_META_CATEGORIES, true));
        if ($user_selected_categories == null)
            $this->categories = array();
        else
            $this->categories = array_map('intval', $user_selected_categories);
        $this->options = json_decode(get_post_meta($this->id, self::PFW_META_OPTIONS, true));

        return true;
    }
    
    
    public function getAllProductsRows()
    {
        $allProducts = new \WP_Query(array(
            'orderby' => $this->options->sortOptions->sortBy,
            'order' => $this->options->sortOptions->order,
            'posts_per_page' => -1,
            'post_type' => 'product',
            'post_status' => 'publish',
            'tax_query' => array(
                array(
                    'taxonomy' => 'product_cat',
                    'field' => 'term_id',
                    'terms' => $this->categories,
                    'operator' => 'IN',
                )
            )
        ));
        
        $productsRows = array();
        while($allProducts->have_posts())
        {
            $allProducts->the_post();
            $productsRows[] = (new PFW_Product(get_the_ID(), $this->fields))->getRow();
        }
        
        return $productsRows;
        
    }



    public function getJSON()
    {
        if ($this->getTableData()!= null)
        {
            return json_encode(array(
                'name' => $this->name,
                'fields' => $this->fields,
                'fieldsHTML' => $this->fieldsHTML,
                'categories' => $this->categories,
                'options' => $this->options
            ));
        } else
        {
            return "WFT";
        }
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getOptions()
    {
        return $this->options;
    }

    public function getTableStyleClass()
    {
        if (isset($this->options->tableStyles) && (isset($this->options->tableStyles->styleClass)))
            return $this->options->tableStyles->styleClass;
        return '';
    }

    /**
     * @param mixed $options
     */
    public function setOptions($options)
    {
        $this->options = $options;
    }

    /**
     * @return mixed
     */
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * @param mixed $categories
     */
    public function setCategories($categories)
    {
        $this->categories = $categories;
    }

    /**
     * @return mixed
     */
    public function getFields()
    {
        return $this->fields;
    }

    /**
     * @param mixed $fields
     */
    public function setFields($fields)
    {
        $this->fields = $fields;
    }

    /**
     * @return mixed
     */
    public function getFieldsHTML()
    {
        return $this->fieldsHTML;
    }

    /**
     * @param mixed $fieldsHTML
     */
    public function setFieldsHTML($fieldsHTML)
    {
        $this->fieldsHTML = $fieldsHTML;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }




    public function save()
    {
        $this->id = wp_insert_post(array(
            'ID' => $this->id,
            'post_content' => $this->fieldsHTML,
            'post_title' => $this->name,
            'post_type' => self::PFW_TABLE_POST_TYPE,
            'meta_input' => array(
                self::PFW_META_OPTIONS => json_encode($this->options),
                self::PFW_META_CATEGORIES => json_encode($this->categories),
                self::PFW_META_FIELDS => json_encode($this->fields)
            )

        ));

        return $this->id;

    }

    //get all available tables
    public static function listTables()
    {
        $tables = get_posts(array(
            'posts_per_page' => -1,
            'post_type' => self::PFW_TABLE_POST_TYPE,
            'post_status' => 'draft'

        ));

        return $tables;
    }


    //generate table html to display to end user
    public function generateTableHTML()
    {

    }





}
