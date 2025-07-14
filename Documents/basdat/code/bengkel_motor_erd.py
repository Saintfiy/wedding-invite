-- Skema Bengkel Motor - SQL DDL Script

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    Nama VARCHAR2(100),
    Alamat VARCHAR2(200),
    NoHP VARCHAR2(20)
);

CREATE TABLE Motor (
    MotorID INT PRIMARY KEY,
    CustomerID INT,
    PlatNomor VARCHAR2(20),
    Merk VARCHAR2(50),
    Tipe VARCHAR2(50),
    Tahun INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE ServiceOrder (
    ServiceOrderID INT PRIMARY KEY,
    MotorID INT,
    TanggalMasuk DATE,
    TanggalSelesai DATE,
    TotalBiaya NUMBER(12,2),
    FOREIGN KEY (MotorID) REFERENCES Motor(MotorID)
);

CREATE TABLE Montir (
    MontirID INT PRIMARY KEY,
    Nama VARCHAR2(100),
    Keahlian VARCHAR2(100),
    NoHP VARCHAR2(20)
);

CREATE TABLE Montir_ServiceOrder (
    MontirID INT,
    ServiceOrderID INT,
    PRIMARY KEY (MontirID, ServiceOrderID),
    FOREIGN KEY (MontirID) REFERENCES Montir(MontirID),
    FOREIGN KEY (ServiceOrderID) REFERENCES ServiceOrder(ServiceOrderID)
);

CREATE TABLE Sparepart (
    SparepartID INT PRIMARY KEY,
    NamaSparepart VARCHAR2(100),
    Harga NUMBER(12,2),
    Stok INT
);

CREATE TABLE TransaksiSparepart (
    TransaksiID INT PRIMARY KEY,
    ServiceOrderID INT,
    SparepartID INT,
    Jumlah INT,
    SubTotal NUMBER(12,2),
    FOREIGN KEY (ServiceOrderID) REFERENCES ServiceOrder(ServiceOrderID),
    FOREIGN KEY (SparepartID) REFERENCES Sparepart(SparepartID)
);

CREATE TABLE DetailService (
    DetailServiceID INT PRIMARY KEY,
    ServiceOrderID INT,
    NamaService VARCHAR2(100),
    Biaya NUMBER(12,2),
    FOREIGN KEY (ServiceOrderID) REFERENCES ServiceOrder(ServiceOrderID)
);

CREATE TABLE Pembayaran (
    PembayaranID INT PRIMARY KEY,
    ServiceOrderID INT,
    TanggalBayar DATE,
    TotalBayar NUMBER(12,2),
    MetodePembayaran VARCHAR2(50),
    FOREIGN KEY (ServiceOrderID) REFERENCES ServiceOrder(ServiceOrderID)
);
