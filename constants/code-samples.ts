export const CODE_SAMPLES: Record<string, string> = {
  typescript: `type CartItem = {
  price: number;
  quantity: number;
};

export function calculateTotal(items: CartItem[]) {
  let total = 0;

  for (const item of items) {
    total += item.price * item.quantity;
  }

  return total;
}`,
  javascript: `function calculateTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price * item.quantity;
  }

  return total;
}`,
  python: `def calculate_total(items):
    total = 0

    for item in items:
        total += item["price"] * item["quantity"]

    return total`,
  java: `public class Cart {
    public static double calculateTotal(List<Item> items) {
        double total = 0;

        for (Item item : items) {
            total += item.price * item.quantity;
        }

        return total;
    }
}`,
  csharp: `public decimal CalculateTotal(IEnumerable<CartItem> items)
{
    decimal total = 0;

    foreach (var item in items)
    {
        total += item.Price * item.Quantity;
    }

    return total;
}`,
  php: `function calculateTotal(array $items): float {
    $total = 0;

    foreach ($items as $item) {
        $total += $item["price"] * $item["quantity"];
    }

    return $total;
}`,
  go: `func CalculateTotal(items []CartItem) float64 {
	total := 0.0

	for _, item := range items {
		total += item.Price * float64(item.Quantity)
	}

	return total
}`,
  ruby: `def calculate_total(items)
  total = 0

  items.each do |item|
    total += item[:price] * item[:quantity]
  end

  total
end`,
};

export function getCodeSample(language: string) {
  return CODE_SAMPLES[language] ?? CODE_SAMPLES.javascript;
}

export function isBuiltInSample(code: string) {
  return Object.values(CODE_SAMPLES).includes(code);
}
