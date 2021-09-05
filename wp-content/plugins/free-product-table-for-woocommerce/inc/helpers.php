<?php
/**
 * Created by PhpStorm.
 * User: MYN
 * Date: 1/12/2019
 * Time: 3:43 AM
 */
use \BinaryCarpenter\PFW\Config as Config;
function pfw_display_pro_message($message)
{

}

/**
 * @param $src_params string: additional parameter added to the url to know where the link was clicked
 */
function pfw_display_pro_message_simple($src_params = 'editor')
{
    if (!Config::PFW_IS_PRO)
    {
        echo '<p class="pfw-upgrade-notice">This feature is available in the pro version only. Please <a href="https://www.binarycarpenter.com/product-table-plugin-for-woocommerce/?src='.$src_params.'">click here</a> to upgrade now to get instant access</p>';
    }
}

function pfw_show_disabled_on_free()
{
    if (!Config::PFW_IS_PRO)
        echo 'disabled';
}