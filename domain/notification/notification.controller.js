export default class NotificationController {
    constructor(services) {
        this.service = services
    }

    //insert menggunakan rabbitMQ
    //1. setiap ada user post akan kasih tau ke semua user ada post terbaru,dengan message brocker
    //2. karena disini sistemnya bukan pertemanan,,maka lebih mudah jadi sistemnya hanya notif ke email yang terdaftar di database, dan kirim bahwa ada post baru, tapi percayalah ini bakalan berat bgt sistemnya, kebanyang ada 1000000000000 user
    //makanya facebook hanya bisa 1000 teman doang pada akhirnya,,walau udah microservices,,apalagi ini mas bro
    async sendNotifEmailIntoUser() {}

    async findAllNotif() {}

    async findOneNotif() {}
}
