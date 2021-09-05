<?php
/**
 * Created by PhpStorm.
 * User: myn
 * Date: 1/5/19
 * Time: 2:55 PM
 */
namespace BinaryCarpenter\PFW;
class PFW_Filter
{

    public static function name($label, $placeholder)
    {
        return "<div class='d-flex flex-column pfw-filter' >".($label!="" ? "<label>$label: </label>" : "").  "<input type='text' placeholder='$placeholder' class='pfw-name-filter' /></div>";
    }

    public static function rating($label = "")
    {
        $html = '<option value="">Rating</option>';
        for ($i =1 ; $i <=5; $i++)
        {
            $html .= sprintf('<option value="%1$s">%2$s</option>', $i, '>=' . $i);
        }

        return sprintf('<select class="pfw-rating-filter">%1$s</select>', $html);

    }

    public static function categories($categories, $label)
    {

        //pfw-filter
        $select = "<select class='' name='pfw_categories[]' multiple='multiple'>";
        foreach ($categories as $category) {
            $select .= "<option value='".get_term($category)->name."'>".get_term($category)->name."</option>";
        }

        $select .= "</select>";
        $select = $label. "<span class='pfw-filter pfw-filter-categories' ><span class='pfw-filter-category-overlay'></span>". $select  ."</span>";

        return $select;



    }

    public static function price($label)
    {
        return sprintf('<span>%1$s<input type="text" class="pfw-price-greater-than" placeholder=">" /> <input type="text" class="pfw-price-less-than" placeholder="<" /> </span>', $label);
    }

}