# ================================ Customizable Settings ================================
# ================================================================
# Reorder Gateways
#
# The order in which you would like your gateways to display
# ================================================================
DESIRED_GATEWAY_ORDER = [
  "Carte de crédit", "PayPal", "KBC/CBC", "Belfius", "Bancontact", "PayPal Express Checkout"
]

# ================================ Script Code (do not edit) ================================
# ================================================================
# ReorderGatewaysCampaign
#
# Reorders gateways into the entered order
# ================================================================
class ReorderGatewaysCampaign
  def initialize(desired_order)
    @desired_order = desired_order.map { |item| item.downcase.strip }
  end

  def run(cart, payment_gateways)
    payment_gateways.sort_by! { |payment_gateway| @desired_order.index(payment_gateway.name.downcase.strip) || Float::INFINITY }
  end
end

CAMPAIGNS = [
  ReorderGatewaysCampaign.new(DESIRED_GATEWAY_ORDER),
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