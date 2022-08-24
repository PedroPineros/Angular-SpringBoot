package com.bolsadeideas.spring.boot.backend.apirest.auth;

public class JwtConfig {
    public static final String LLAVE_SECRETA = "alguna.clave.123";
    public static final String RSA_PRIVATE = "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIEpQIBAAKCAQEAuJiT1hR3VphvG4qjdmrQ7gX17EegkwOrwmpDsCBNy4vc3jo3\n" +
            "cw3nCZEEd/zGPplEkRj2t8vF0dywlOqt6EGWmYcB8MSpcUwkAX+UftsN9Ec7vMbh\n" +
            "6ACyl3T133zfWjRcXMujtnofzqrfMnIO8ALfBl2S4FMkpBTMAYhLv1hCzZG1fdyB\n" +
            "ha11pJaNFhER6WdcHQuoY2RwQxz3rD/aO7ZJCOt5ZMsZTo+Rli4VwLkcYC67SJco\n" +
            "Pw3auW4iElUoPuiMpnLLJ31TLfzQTge3C/pdi7ktkGb3/EENeJbPXM0cG+3IxV9q\n" +
            "xBaaIRfQLlS8vhmxnBD8gs0OaoA4I6p3p1072wIDAQABAoIBAQClUlCknDO85Ewt\n" +
            "uF5pQYTYh5IWCJgw0krTlWQFqwjBUQOAK1dZvYu7L5t28nWBvrZ/1IGxXdhO+X1U\n" +
            "AVG6/nKoEReV0CuIgo6EoQQXEIxQyDMiAGR16ZoItwE1JJrMKLTHjsGSPZGa/8Fh\n" +
            "ZnEmVwvyoX9XVF8ubEnA3ZYpShyaCW2EuaUhMfAAfMtMPEAxrJQ50Cg33sV0xmDA\n" +
            "EXKnVqwEh3UDdoE6TmeBQOkApr3oQ7AejZGR2S0pIguAZMPYtoa5cXVUysRDRwkx\n" +
            "YSTmH4q6RRSQsICNoYJz6G5jLQfXJazADeQzSZSZcxe55HXnB0vIz3ggK+Ss7oID\n" +
            "Ei4O6T/BAoGBAOFo8CdRN0IcxNMe+wcPlIhZDVvB1so1YZ+6sy22X3ZGUtd9yKZQ\n" +
            "3Wjuf/DJeT0RKlKg4Dv64HfeF6gQ/baCN3F72wi2N7dK5jl+lFY8KB/D3kgZjtl2\n" +
            "oOBztg3OExC2SvPlCCrRJEjumhpOhiIrqi1MoNe4HaJahNPLL8vTY28rAoGBANGl\n" +
            "tLvbipmDACTADahSk1cTCF2kJgUWFKUkWkSfv0uUfxETXoLLPhR0G1lgc9e9wpcs\n" +
            "ydfQHJtmNvlsWReIXBMh51jCfAu+nF/5dc+MIs4f2wp+yVG6BFpSO0RNfQer4tw/\n" +
            "pdYJD5NHnrkAZ6UIiumzHxVll4aK4MytUf1ty44RAoGBAJmcn/zLVjMR0/hkZoIb\n" +
            "VgfNWFMtuCi5VDw8SZtfa5L4vb/pEnJ1LU4zKrF3O84oAoWo6Oc3Qv2tNsXsPlrA\n" +
            "RvRpiY1YUIPy4Q5RetmByX5MRxEvibAdLemIMYsa4tdCw7WOYZB8UpP5Nr+yv6pN\n" +
            "w313eS1JZbico2SKVZo8BsldAoGAKpI3jR4bmuibEttc6p06Bih7Pmiiv82oC5DC\n" +
            "M8UslzBkTRddzblvtb+N/iwz2c9SwFf79LLx3Cx5ZVS3EqxB5jCwRbnYbpoaLvL9\n" +
            "FVQjjS+yzwLH5qybTav9FPWXOgORYaAbEMduPj4A4RhP85c0fhg9a57hkhSJaYaY\n" +
            "a5nsB8ECgYEAsoS/StDBrKMMrxG8/O7dIUeZ3opFsDdwmX+DUEKD8z6s4cKZvXsM\n" +
            "risfb+UDfPQ7yiJN/j+rlNSaFQKyRCzBf1yry59654lNKrsa/IHdEAjXtgWmaw3n\n" +
            "U8FrqeacercGL2WloKitE7VOGDTHZmBLHDLecw+/igqMDcjIvzmtURI=\n" +
            "-----END RSA PRIVATE KEY-----";

    public static final String RSA_PUBLICA ="-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuJiT1hR3VphvG4qjdmrQ\n" +
            "7gX17EegkwOrwmpDsCBNy4vc3jo3cw3nCZEEd/zGPplEkRj2t8vF0dywlOqt6EGW\n" +
            "mYcB8MSpcUwkAX+UftsN9Ec7vMbh6ACyl3T133zfWjRcXMujtnofzqrfMnIO8ALf\n" +
            "Bl2S4FMkpBTMAYhLv1hCzZG1fdyBha11pJaNFhER6WdcHQuoY2RwQxz3rD/aO7ZJ\n" +
            "COt5ZMsZTo+Rli4VwLkcYC67SJcoPw3auW4iElUoPuiMpnLLJ31TLfzQTge3C/pd\n" +
            "i7ktkGb3/EENeJbPXM0cG+3IxV9qxBaaIRfQLlS8vhmxnBD8gs0OaoA4I6p3p107\n" +
            "2wIDAQAB\n" +
            "-----END PUBLIC KEY-----";

}
