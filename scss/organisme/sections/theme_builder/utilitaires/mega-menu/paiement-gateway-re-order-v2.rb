# ================================ Customizable Settings ================================
# ================================================================
# Reorder Gateways
#
# The order in which you would like your gateways to display
# ================================================================
DESIRED_GATEWAY_ORDER_CB = [
  "Shopify Payments","PayPal Express Checkout","Scalapay - Pay in 3 installments without interest","Bancontact","KBC/CBC","Belfius"
]

DESIRED_GATEWAY_ORDER_NOT_CB = [
  "PayPal Express Checkout","Shopify Payments","Scalapay - Pay in 3 installments without interest","Bancontact","KBC/CBC","Belfius"
]

COUNTRY_SORT = {
    country_code_match_type: :include,
    country_codes: ["FR"],
}

# ================================ Script Code (do not edit) ================================
# ================================================================
# CountrySelector
#
# Finds whether the supplied country code matches the entered
# string.
# ================================================================
class CountrySelector
  def initialize(match_type, countries)
    @match_type = match_type
    @countries = countries.map { |country| country.upcase.strip }
  end

  def match?(country_code)
    (@match_type == :include) == @countries.include?(country_code.upcase.strip)
  end
end

# ================================ Script Code (do not edit) ================================
# ================================================================
# ReorderGatewaysCampaign
#
# Reorders gateways into the entered order
# ================================================================
class ReorderGatewaysCampaign
  def initialize(desired_order_cb, desired_order_not_cb, country_sort)
    @desired_order_cb = desired_order_cb.map { |item| item.downcase.strip }
    @desired_order_not_cb = desired_order_not_cb.map { |item| item.downcase.strip }
    @country_sort = country_sort
  end

  def run(cart, payment_gateways)
    address = cart.shipping_address
    return if address.nil?
    #
    country_selector = CountrySelector.new(
        @country_sort[:country_code_match_type],
        @country_sort[:country_codes],
      )
    if country_selector.match?(address.country_code)
      payment_gateways.sort_by! { |payment_gateway| @desired_order_cb.index(payment_gateway.name.downcase.strip) || Float::INFINITY }
    else
      payment_gateways.sort_by! { |payment_gateway| @desired_order_not_cb.index(payment_gateway.name.downcase.strip) || Float::INFINITY }
    end
  end
end

# ================================ Script Code (do not edit) ================================
# ================================================================
#
# check country.
# ================================================================

CAMPAIGNS = [
  ReorderGatewaysCampaign.new(DESIRED_GATEWAY_ORDER_CB, DESIRED_GATEWAY_ORDER_NOT_CB, COUNTRY_SORT),
]

CAMPAIGNS.each do |campaign|
  campaign.run(Input.cart, Input.payment_gateways)
end

Output.payment_gateways = Input.payment_gateways


################################################
##### Hiding payment method by country #####

 
PAYMENT_METHOD = 'Bancontact'
ELIGIBLE_COUNTRY_CODES = ['BE']
 
if Input.cart.shipping_address and ELIGIBLE_COUNTRY_CODES.include?(Input.cart.shipping_address.country_code)
  Output.payment_gateways = Input.payment_gateways
else
  Output.payment_gateways = Input.payment_gateways.delete_if do |payment_gateway|
    payment_gateway.name == PAYMENT_METHOD
  end
end


PAYMENT_METHOD = 'KBC/CBC'
ELIGIBLE_COUNTRY_CODES = ['BE']
 
if Input.cart.shipping_address and ELIGIBLE_COUNTRY_CODES.include?(Input.cart.shipping_address.country_code)
  Output.payment_gateways = Input.payment_gateways
else
  Output.payment_gateways = Input.payment_gateways.delete_if do |payment_gateway|
    payment_gateway.name == PAYMENT_METHOD
  end
end

PAYMENT_METHOD = 'Belfius'
ELIGIBLE_COUNTRY_CODES = ['BE']
 
if Input.cart.shipping_address and ELIGIBLE_COUNTRY_CODES.include?(Input.cart.shipping_address.country_code)
  Output.payment_gateways = Input.payment_gateways
else
  Output.payment_gateways = Input.payment_gateways.delete_if do |payment_gateway|
    payment_gateway.name == PAYMENT_METHOD
  end
end

################################################