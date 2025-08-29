export const request_selectors = {
    // Waypoint Selectors
    input_waypoint1_earliest_pickup: '[data-test-id="dp-input"]',
    input_waypoint1_latest_pickup: '[data-test-id="dp-input"]',
    input_waypoint1_name_company: '[id="waypoints[0].name"]',
    input_waypoint1_street: '[id="waypoints[0].street"]',
    input_waypoint1_city: '[id="waypoints[0].city"]',
    select_waypoint1_country: '[id="waypoints[0].country"]',
    input_waypoint1_zip: '[id="waypoints[0].postCode"]',
    input_waypoint1_contact_name: '[id="waypoints[0].contactName"]',
    input_waypoint1_email: '[id="waypoints[0].contactEmail"]',
    input_waypoint1_phone: '[id="waypoints[0].contactPhone"]',
    chk_waypoint1_save_address: 'input[name="waypoints[0].saveToDirectory"]',
    input_waypoint1_reference: '[id="waypoints[0].reference"]',
    chk_waypoint1_note: 'input[name="waypoints[0].noteExpanded"]',
    input_waypoint1_note: '[id="waypoints[0].note"]',

    input_waypoint2_earliest_delivery: '[data-test-id="dp-input"]',
    input_waypoint2_latest_delivery: '[data-test-id="dp-input"]',
    input_waypoint2_name_company: '[id="waypoints[1].name"]',
    input_waypoint2_street: '[id="waypoints[1].street"]',
    input_waypoint2_city: '[id="waypoints[1].city"]',
    select_waypoint2_country: '[id="waypoints[1].country"]',
    input_waypoint2_zip: '[id="waypoints[1].postCode"]',
    input_waypoint2_contact_name: '[id="waypoints[1].contactName"]',
    input_waypoint2_email: '[id="waypoints[1].contactEmail"]',
    input_waypoint2_phone: '[id="waypoints[1].contactPhone"]',
    chk_waypoint2_save_address: 'input[name="waypoints[1].saveToDirectory"]',
    input_waypoint2_reference: '[id="waypoints[1].reference"]',
    chk_waypoint2_note: 'input[name="waypoints[1].noteExpanded"]',
    input_waypoint2_note: '[id="waypoints[1].note"]',

    // Common Tabs
    tab_waypoints: 'button:has-text("1. Waypoints")',
    tab_cargo_info: 'button:has-text("2. Cargo info")',
    tab_carriers: 'button:has-text("3. Carriers")',
    tab_review: 'button:has-text("4. Review")',

    // Navigation buttons
    btn_continue: 'button:has-text("Continue")',
    btn_go_back: 'button:has-text("Go back")',

    // Cargo Info Page
    input_cargo_reference: '#reference',
    input_cargo_cost_center: '#costCenter',
    input_cargo_description: '[name="cargo.description"]',
    select_cargo_requirements: '[aria-label="Special requirements"]',
    select_cargo_type: '[aria-label="Cargo type"]',
    option_cargo_type_other: 'li[role="option"]:has-text("Other")',
    input_cargo_value: '[aria-label="Value"]',
    input_cargo_length: 'input[aria-label="Max. length"]',
    input_cargo_weight: 'input[aria-label="Overall weight"]',
    chk_cargo_note: 'input[type="checkbox"]:has-text("Add note for carrier")',
    input_cargo_note: 'textarea[aria-label="Note for carrier"]',

    // Carriers Page
    heading_carriers: 'h2:has-text("Carriers and options")',
    text_insta_order: 'h3:has-text("InstaOrder is not available")',
    text_insta_order_message: ':text("Sorry, our partners cannot offer an instant price for this request.")',
    
    // Transport Type
    radio_spot_transport: 'input[type="radio"][name="transportType"]:has-text("Spot transport")',
    radio_contracted_transport: 'input[type="radio"][name="transportType"]:has-text("Contracted transport")',
    radio_evidence_only: 'input[type="radio"][name="transportType"]:has-text("Evidence-only")',
    
    // Carrier Selection
    heading_select_contacts: ':text("Select contacts")',
    btn_add_carrier: 'button:has-text("Add carrier")',
    chk_select_all: 'input[type="checkbox"]:has-text("Select all")',
    input_carrier_search: 'input[placeholder="Search for carrier by name or email"]',
    
    // Review Section
    heading_cargo_info: 'h4:has-text("Cargo information")',
    btn_edit_cargo: 'button:has-text("Edit"):first-of-type',
    heading_route_waypoints: 'h4:has-text("Route waypoints")',
    btn_edit_waypoints: 'button:has-text("Edit"):nth-of-type(2")',
    text_transportation_mode: ':text("Transportation mode:")',
    text_road: ':text("Road")'
};
