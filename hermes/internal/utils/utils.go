package utils

func Flatten(data map[string]interface{}, prefix ...string) map[string]interface{} {
	result := make(map[string]interface{})
	for k, v := range data {
		key := k
		if len(prefix) > 0 {
			key = prefix[0] + "." + k
		}
		if m, ok := v.(map[string]interface{}); ok {
			nested := Flatten(m, key)
			for nk, nv := range nested {
				result[nk] = nv
			}
		} else {
			result[key] = v
		}
	}
	return result
}
