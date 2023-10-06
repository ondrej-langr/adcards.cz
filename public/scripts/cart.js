const pcUrl    = document.querySelector('#pc-url').value;
const extraUrl = document.querySelector('#extra-url').value;

const cardsJson  = document.querySelector('#cards-json').value;
const extrasJson = document.querySelector('#extras-json').value;

window.cart = new Vue({
    el: '#app-cart',
    delimiters: ['${', '}'],
    data: {
        cards         : cardsJson,
        extras        : extrasJson,
        promoCode     : '',
        promoCodeValid: null,
        promoCodeAmount: 0,
        message       : '',
        priceTotal    : {
            old: Number(document.querySelector('#priceTotal').value),
            new: null
        },
        shippingMethod: {
            code  : 'PERSONAL',
            amount: 0
        },
        oldShippingMethod: {
            amount: 0
        }
    },
    watch: {
        shippingMethod: {
            handler() {
                this.priceTotal.old = this.priceTotal.old - this.oldShippingMethod.amount;
                this.priceTotal.new = this.priceTotal.new - this.oldShippingMethod.amount;

                this.priceTotal.old = this.priceTotal.old + this.shippingMethod.amount;
                this.priceTotal.new = this.priceTotal.new + this.shippingMethod.amount;

                this.oldShippingMethod.amount = this.shippingMethod.amount;
            },
            deep: true
        }
    },
    methods: {
        checkPromoCode: function() {
            let vm = this;

            axios.get(pcUrl + '?code=' + vm.promoCode)
                .then(response => {
                    if(response.data == 0) {
                        vm.promoCodeValid = false;
                        vm.message = 'Invalid promo code!';

                        vm.priceTotal.new = null;
                    }

                    else {
                        vm.promoCodeValid = true;
                        vm.message = 'Promo code found!';

                        vm.priceTotal.new  = vm.priceTotal.old - vm.priceTotal.old * (response.data.amount/100);
                        vm.promoCodeAmount = response.data.amount;
                    }
                });
        },

        setShipping: function(code, amount) {
            console.log(code);

            this.shippingMethod.code    = code;
            this.shippingMethod.amount  = amount;
        }
    }
});

function toggleExtra(el) {
    let url = extraUrl + (el.dataset.extraToggle == 'add' ? '/add?id=' : '/remove?key=') + el.dataset.extraValue;

    axios.get(url)
        .then(response => {
            if(response.data == 0) {
                alert('Fail');
            }

            else {
                document.querySelector('.full-order').innerHTML = response.data.items;
                window.cart.priceTotal.old                      = response.data.priceTotal + window.cart.shippingMethod.amount;
                window.cart.priceTotal.new                      = ((response.data.priceTotal + window.cart.shippingMethod.amount) - (response.data.priceTotal + window.cart.shippingMethod.amount) * (window.cart.promoCodeAmount/100));
            }
        });
}

function zasilkovna() {
    Packeta.Widget.pick('5d7032d2392ceefd', (ep) => {
        document.querySelector('#shippingMethodInp').value = ep.name + ', ' + ep.zip;
        document.querySelector('#zasilkovnaBtn').innerHTML = ep.name;
    });
}

var constraints = {
    city: {
        presence: true,
        length: {
            minimum: 3
        }
    },
    email: {
        presence: true,
        email: true
    },
    firstname: {
        presence: true,
        length: {
            minimum: 3
        }
    },
    houseNumber: {
        presence: true,
        format: {
            pattern: '^[0-9]+'
        }
    },
    lastname: {
        presence: true,
        length: {
            minimum: 3
        }
    },
    phone: {
        presence: true,
        length: {
            minimum: 3,
            maximum: 13
        }
    },
    postalCode: {
        presence: true,
        format: {
            pattern: '\\d{5}'
        }
    },
    street: {
        presence: true,
        length: {
            minimum: 3
        }
    },
    paymentMethod: {
        presence: true
    },
    shippingMethod: {
        presence: true,
        length: {
            minimum: 1
        }
    }
};

function validateField(e) {
    let check = {};

    check[e.target.name] = e.target.value;

    if(validate(check, constraints)[e.target.name] !== undefined) {
        e.target.classList.add('is-invalid');
    }

    else {
        e.target.classList.remove('is-invalid');
    }
}

function submitForm() {
    let valid = true;
    let check = {};

    Array.prototype.map.call(document.querySelectorAll('.input-required'), input => {
        if(input.name == 'shippingMethod') {
            document.getElementsByName('shippingMethodBtn')[0].classList.remove('is-invalid');
        }

        input.classList.remove('is-invalid');

        if(input.type == 'radio') {
            if(input.checked) {
                check[input.name] = input.value;
            }
        }

        else {
            if(input.name == 'shippingMethod[code]') {
                check['shippingMethod'] = input.value;
            }

            else {
                check[input.name] = input.value;
            }
        }
    });

    let validation = validate(check, constraints);

    console.log(check);
    console.log(validation);

    if(validation) {
        Object.keys(validation).map((name) => {
            if(name == 'shippingMethod') {
                name = 'shippingMethodBtn';
            }

            document.getElementsByName(name)[0].classList.add('is-invalid');
            valid = false;
        });
    }

    if(valid) {
        document.querySelector('#cart-form').submit()
    }
}