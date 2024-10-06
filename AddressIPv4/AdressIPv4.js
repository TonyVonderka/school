class AddressIPv4 {
  constructor(address) {
    this.set(address);
  }

  isValid() {
    const octets = this.address.split(".");
    if (octets.length !== 4) {
      return false;
    }

    for (let i = 0; i < octets.length; i++) {
      const octet = Number(octets[i]);

      if (
        isNaN(octet) ||
        octet < 0 ||
        octet > 255 ||
        octets[i] !== String(octet)
      ) {
        return false;
      }
    }
    return true;
  }

  set(address) {
    this.address = address;
    this.octets = address.split(".");
    return this;
  }

  getAsString() {
    if (!this.isValid()) {
      throw new Error("Invalid IPv4 address.");
    }
    return this.address;
  }

  getAsInt() {
    if (!this.isValid()) {
      throw new Error("Invalid IPv4 address.");
    }

    const firstOctet = this.octets[0];
    const secondOctet = this.octets[1];
    const thirdOctet = this.octets[2];
    const fourthOctet = this.octets[3];

    return (
      firstOctet * 256 ** 3 +
      secondOctet * 256 ** 2 +
      thirdOctet * 256 ** 1 +
      fourthOctet * 256 ** 0
    );
  }

  getAsBinaryString() {
    if (!this.isValid()) {
      throw new Error("Invalid IPv4 address.");
    }

    return this.octets
      .map((octet) => ("00000000" + parseInt(octet).toString(2)).slice(-8))
      .join("");
  }

  getOctet(number) {
    if (number < 1 || number > 4) {
      throw new Error("Octet number must be between 1 and 4.");
    }
    if (!this.isValid()) {
      throw new Error("Invalid IPv4 address.");
    }
    return Number(this.octets[number - 1]);
  }

  getClass() {
    if (!this.isValid()) {
      throw new Error("Invalid IPv4 address.");
    }
    const firstOctet = this.octets[0];

    if (firstOctet >= 1 && firstOctet <= 127) {
      return "A";
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      return "B";
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      return "C";
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      return "D";
    } else if (firstOctet >= 240 && firstOctet <= 255) {
      return "E";
    }
  }

  isPrivate() {
    if (!this.isValid()) {
      throw new Error("Invalid IPv4 address.");
    }

    const firstOctet = this.getOctet(1);
    const secondOctet = this.getOctet(2);

    if (firstOctet == 10) {
      return true;
    } else if (firstOctet == 172 && secondOctet >= 16 && secondOctet <= 31) {
      return true;
    } else if (firstOctet == 192 && secondOctet == 168) {
      return true;
    } else {
      return false;
    }
  }
}

class Mask extends AddressIPv4 {}

const ip1 = new AddressIPv4("192.168.1.1");

try {
  console.log(ip1.isValid(), typeof ip1.isValid());
  console.log(ip1.getAsString(), typeof ip1.getAsString());
  console.log(ip1.set("192.166.1.1"));
  console.log(ip1.getAsString(), typeof ip1.getAsString());
  console.log(ip1.getAsInt(), typeof ip1.getAsInt());
  console.log(ip1.getAsBinaryString(), typeof ip1.getAsBinaryString());
  console.log(ip1.getOctet(2), typeof ip1.getOctet(2));
  console.log(ip1.getClass(), typeof ip1.getClass());
  console.log(ip1.isPrivate(), typeof ip1.isPrivate());
} catch {
  throw new Error("Error");
}
