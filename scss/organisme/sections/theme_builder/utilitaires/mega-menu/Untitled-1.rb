

Input.payment_gateways.each do |payment_gateway|
    puts payment_gateway
end
puts("FINISHED")

desired_order = ["Shopify Payments", "PayPal Express Checkout","Scalapay - Pay in 3 installments without interest","Bancontact","KBC/CBC","Belfius"]
Output.payment_gateways = Input.payment_gateways.sort_by! do |payment_gateway|
  desired_order.index(payment_gateway.name) || Float::INFINITY
end


PayPal
Credit card
Scalapay - Pay in 3 installments without interest
Bancontact
KBC/CBC
Belfius


PayPal Express Checkout
Shopify Payments
Scalapay - Pay in 3 installments without interest
Bancontact
KBC/CBC


PayPal Express Checkout
Shopify Payments
Scalapay - Pay in 3 installments without interest
Bancontact
KBC/CBC
Belfius

