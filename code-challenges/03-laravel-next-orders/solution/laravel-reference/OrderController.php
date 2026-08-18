<?php
/**
 * Laravel reference — OrderController store (paste into app/Http/Controllers/Api/OrderController.php)
 * Shows transaction + stock check + eager-load pattern expected in the challenge.
 */

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController
{
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = DB::transaction(function () use ($request) {
            $data = $request->validated();
            $total = 0;
            $lines = [];

            foreach ($data['items'] as $item) {
                /** @var Product $product */
                $product = Product::query()->lockForUpdate()->findOrFail($item['product_id']);
                if ($product->stock < $item['quantity']) {
                    abort(422, 'Insufficient stock for '.$product->sku);
                }
                $product->decrement('stock', $item['quantity']);
                $lines[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                ];
                $total += $product->price * $item['quantity'];
            }

            $order = Order::create([
                'customer_id' => $data['customer_id'],
                'status' => 'pending',
                'total' => $total,
            ]);
            $order->items()->createMany($lines);

            return $order->load(['customer', 'items.product']);
        });

        return (new OrderResource($order))
            ->response()
            ->setStatusCode(201);
    }

    public function index()
    {
        // Eager load — avoid N+1
        $orders = Order::query()
            ->with(['customer:id,name', 'items.product:id,name,sku'])
            ->when(request('status'), fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(20);

        return OrderResource::collection($orders);
    }
}
