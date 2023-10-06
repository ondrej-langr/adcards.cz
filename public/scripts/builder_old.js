window.app = new Vue({
    el: '.card-preview-app',
    delimiters: ['${', '}'],
    data: {
        background: null,
        backgroundId: null,
        backgroundName: null,
        textColor: null,
        name: null,
        country: {
            data: null,
            src: null,
            custom: false
        },
        club: {
            data: null,
            src: null,
            custom: false
        },
        image: null,
        rating: '99',
        position: 'CAM',
        cardType: 'player',
        realPlayer: 0,
        size: 2,
        stats: {
            player: {
                0: {
                    name: 'pac',
                    value: 99
                },
                1: {
                    name: 'dri',
                    value: 99
                },
                2: {
                    name: 'sho',
                    value: 99
                },
                3: {
                    name: 'def',
                    value: 99
                },
                4: {
                    name: 'pas',
                    value: 99
                },
                5: {
                    name: 'phy',
                    value: 99
                },
            },
            goalKeeper: {
                0: {
                    name: 'div',
                    value: 99
                },
                1: {
                    name: 'ref',
                    value: 99
                },
                2: {
                    name: 'han',
                    value: 99
                },
                3: {
                    name: 'spe',
                    value: 99
                },
                4: {
                    name: 'kic',
                    value: 99
                },
                5: {
                    name: 'pos',
                    value: 99
                },
            }
        }
    },
    methods: {

        validateForm() {
            let requiredFields = [];

            if(this.realPlayer == 0) {
                requiredFields = [
                    this.background,
                    this.name,
                    this.country.data,
                    this.club.data,
                    this.image,
                    this.rating,
                    this.position,
                    this.cardType,
                    this.size
                ];
            }

            else {
                requiredFields = [
                    this.background,
                    this.name,
                    this.size
                ]
            }

            let valid = true;

            requiredFields.map(field => {
                if(field === null || field == '') {
                    valid = false;
                    return;
                }
            });

            if(valid) {
                document.querySelector('#add-to-cart-btn').removeAttribute('disabled');
            }

            else {
                document.querySelector('#add-to-cart-btn').setAttribute('disabled', true);
            }
        }

    }
});

let cropperImage = document.querySelector('.image-preview');

cropperImage.addEventListener('ready', () => {
    window.app['image'] = cropper
        .getCroppedCanvas()
        .toDataURL();
});

cropperImage.addEventListener('cropend', () => {
    window.app['image'] = cropper
        .getCroppedCanvas()
        .toDataURL();
});

let cropper = new Cropper(cropperImage, {
    preview: '#card-image',
    zoomOnWheel: true,
    background: true,
    restore: false,
    responsive: true,
    cropBoxResizable: true,
});

function readURL(input, varName) {
    let img = new Image();

    if (input.files && input.files[0]) {
        let reader  = new FileReader();

        reader.onload = function (e) {
            if(varName == 'image') {
                cropper.replace(e.target.result);
            }

            if(!window.app[varName]) {
                window.app[varName] = {};
            }

            window.app[varName].data = e.target.result;
            window.app[varName].src  = e.target.result;
            img.src                  = e.target.result;
        }

        img.onload = () => {
            this.height = 600;
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

function insertFlag(src, varName) {
    window.app[varName].src = src;
}

function toggleImageEditor() {
    if(document.querySelector('.image-editor').classList.contains('toggled')) {
        document.querySelector('.image-editor').classList.remove('toggled')
    }

    else {
        document.querySelector('.image-editor').classList.add('toggled')
    }
}

function validateField(e) {
    if(e.target.value == '') {
        e.target.classList.add('is-invalid');
    }

    else {
        e.target.classList.remove('is-invalid');
    }
}